var ctxobj = require('../main').new;

exports.ctxobj = function(test) {
	var any = {};

	any.getContext = function() { 
		return this.ctx; 
	};

	var c0 = ctxobj(any);
	test.deepEqual(c0.getContext(), []);

	var c1 = c0.pushctx("C1");
	test.deepEqual(c0.getContext(), []);
	test.deepEqual(c1.getContext(), ["C1"]);

	var c2 = c1.pushctx("C2");
	test.deepEqual(c0.getContext(), []);
	test.deepEqual(c1.getContext(), ["C1"]);
	test.deepEqual(c2.getContext(), ["C1","C2"]);

	var c3 = c2.pushctx("C3");
	test.deepEqual(c0.getContext(), []);
	test.deepEqual(c1.getContext(), ["C1"]);
	test.deepEqual(c2.getContext(), ["C1","C2"]);
	test.deepEqual(c3.getContext(), ["C1","C2","C3"]);

	var c4 = c3.popctx(c3);
	test.deepEqual(c0.getContext(), []);
	test.deepEqual(c1.getContext(), ["C1"]);
	test.deepEqual(c2.getContext(), ["C1","C2"]);
	test.deepEqual(c3.getContext(), ["C1","C2","C3"]);
	test.deepEqual(c4.getContext(), ["C1","C2"]);

	var c5 = c4.popctx();
	test.deepEqual(c5.getContext(), ["C1"]);

	var c6 = c5.pushctx('C6');
	test.deepEqual(c6.getContext(), ["C1","C6"]);

	var c7 = c6.unshiftctx('C7');
	test.deepEqual(c7.getContext(), ["C7","C1","C6"]);

	var c8 = c7.shiftctx();
	test.deepEqual(c8.getContext(), ["C1","C6"]);

	var c9 = c3.pushctx("C9");
	test.deepEqual(c9.getContext(), ["C1","C2","C3","C9"]);

	test.done();
}