var object = require('../main').object;

exports.object = function(test) {
	var parent = { a: 'hello', foo: function() { return 123; } };
	var child = object(parent);

	child.goo = function() { return 456; };

	test.equal(parent.a, 'hello');
	test.equal(parent.foo(), 123);
	test.equal(child.a, 'hello');
	test.equal(child.foo(), 123);
	test.ok(!parent.goo);
	test.ok(child.goo);
	test.equal(child.goo(), 456);

	parent.foo = function() { return 789; };
	test.equal(parent.foo(), 789);
	test.equal(child.foo(), 789);

	child.foo = function() { return 'abc'; };
	test.equal(parent.foo(), 789);
	test.equal(child.foo(), 'abc');

	test.done();
}

