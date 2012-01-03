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

	cc._logctx = function(level, args) {
		var ctx = this.ctx;
		for (var i = ctx.length - 1; i >= 0; --i) {
			var c = ctx[i];
			if (typeof c === "function") c = c();
			if (sep) args.unshift(sep);
			args.unshift("[" + c + "]");
		}
		
		con[level].apply(con, args);
	};

	cc.timestamp = function() {
		return this.pushctx(function() {
			return JSON.stringify(new Date).replace(/\"/g, '');
		});
	}

	var levels = [ 'info', 'log', 'warn', 'error' ];

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