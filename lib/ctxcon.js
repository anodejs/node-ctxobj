var ctxobj = require('./ctxobj');

/**
 * Takes a console and makes it a contextual object.
 * Basically, this means that whenever a log line is emitted, the context objects are prepended in order.
 * Use 'pushctx' and 'popctx' (and other ctxobj functions) to update the context.
 * @param con {Console} Any console.
 * @api public
 */
function ctxcon(con, sep) {
	if (con.ctx) return con;

	var cc = ctxobj(con);

	// select default log function to be used if a log function is not defined
	var defaultFn = con.log || con.trace || con.debug || con.verbose || con.info;

	cc._logctx = function(level, args) {
		var ctx = this.ctx;
		for (var i = ctx.length - 1; i >= 0; --i) {
			var c = ctx[i];
			if (typeof c === "function") c = c();
			if (sep) args.unshift(sep);
			args.unshift("[" + c + "]");
		}
		
		var fn = con[level];
		if (!fn) fn = defaultFn;
		fn.apply(con, args);
	};

	cc.timestamp = function() {
		return this.pushctx(function() {
			return JSON.stringify(new Date).replace(/\"/g, '');
		});
	}

	cc.stacktop = function(skip) {
		if (!skip) skip = 4;
		var stacktop = function() {
			try { throw new Error(); }
			catch (e) { 
				var lines = e.stack.split('\n');
				var top = lines[skip];
				return /([^\ ^(^\/^\\]+:\d+:\d+)/.exec(top)[0];
			}
		};

		return this.pushctx(stacktop);
	};

	var levels = [ 'info', 'log', 'warn', 'error', 'debug', 'trace', 'silly', 'verbose' ];

	levels.forEach(function(level) {
		cc[level] = function() {
			var args = [];
			for (var k in arguments) args.push(arguments[k]);
			this._logctx(level, args);
		};
	});

	return cc;
}

module.exports = ctxcon;