function ctxobj(o) {
	var octx = Object.create(o);
	var ctx = [];

	octx.forEachCtx = function(f) {
		ctx.forEach(f);
		return this;
	}

	octx.pushctx = function(c) {
		ctx.push(c);
		return this;
	}

	octx.popctx = function() {
		ctx.pop();
		return this;
	}

	octx.unshiftctx = function(c) {
		ctx.unshift(c);
		return this;
	}

	octx.shiftctx = function(c) {
		ctx.shift(c);
		return this;
	}

	return octx;
}

module.exports = ctxobj;