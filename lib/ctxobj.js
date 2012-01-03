var object = require('./object');

function ctxobj(o) {
	var o2 = object(o);

	o2._ctx = o2._ctx ? object(o2._ctx) : [];	

	if (!o2.ctx) o2.__defineGetter__('ctx', function() {
		var arr = [];
		this._ctx.forEach(function(c) { arr.push(c); });
		return arr;
	});

	if (!o2.pushctx) o2.pushctx = function(ctx) {
		var o3 = ctxobj(this);
		if (ctx) o3._ctx.push(ctx);
		return o3;
	};

	if (!o2.popctx) o2.popctx = function() {
		var o3 = ctxobj(this);
		o3._ctx.pop();
		return o3;
	}

	if (!o2.unshiftctx) o2.unshiftctx = function(ctx) {
		var o3 = ctxobj(this);
		if (ctx) o3._ctx.unshift(ctx);
		return o3;
	}

	if (!o2.shiftctx) o2.shiftctx = function(ctx) {
		var o3 = ctxobj(this);
		o3._ctx.shift();
		return o3;
	}

	return o2;
}

module.exports = ctxobj;