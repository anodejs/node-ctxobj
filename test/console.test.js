var ctxcon = require('../main').console;

exports.ctxcon = function(test) {

	var mock = {
		last: null,
		log: function() {
			var args = [];
			for (var k in arguments) args.push(arguments[k]);
			console.log('>>>', args);
			this.last = args;
			return true;
		},
	};

	var c0 = ctxcon(mock);
	c0.log('hello');
	test.deepEqual(mock.last, [ 'hello' ]);

	var c1 = c0.pushctx('C1');
	c1.log('yoyo'); test.deepEqual(mock.last, [ '[C1]', 'yoyo' ]);
	c0.log('yoyo'); test.deepEqual(mock.last, [ 'yoyo' ]);

	var c2 = c1.pushctx('C2');
	c2.log('damn!'); test.deepEqual(mock.last, [ '[C1]', '[C2]', 'damn!' ]);
	c1.log('yoyo'); test.deepEqual(mock.last, [ '[C1]', 'yoyo' ]);
	c0.log('yoyo'); test.deepEqual(mock.last, [ 'yoyo' ]);

	var c3 = c2.popctx().pushctx('C3');
	c3.log('xyz'); test.deepEqual(mock.last, ['[C1]', '[C3]', 'xyz' ]);
	c2.log('damn!'); test.deepEqual(mock.last, [ '[C1]', '[C2]', 'damn!' ]);
	c1.log('yoyo'); test.deepEqual(mock.last, [ '[C1]', 'yoyo' ]);
	c0.log('yoyo'); test.deepEqual(mock.last, [ 'yoyo' ]);

	var i = 10;
	var c4 = c3.pushctx(function() { return i++; });
	c4.log("popo"); test.deepEqual(mock.last, [ '[C1]', '[C3]', '[10]', "popo" ]);
	c4.log("popo"); test.deepEqual(mock.last, [ '[C1]', '[C3]', '[11]', "popo" ]);
	c4.log("popo"); test.deepEqual(mock.last, [ '[C1]', '[C3]', '[12]', "popo" ]);
	c4.log("popo"); test.deepEqual(mock.last, [ '[C1]', '[C3]', '[13]', "popo" ]);

	var c5 = c4.timestamp();
	c5.log("ts"); 
	test.deepEqual(mock.last.length, 5);
	test.ok(mock.last[3].indexOf("T") !== -1 && mock.last[3].indexOf("Z") !== -1);

	test.done();
};

