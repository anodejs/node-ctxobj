var ctxcon = require('../main').console;

exports.ctxcon = function(test) {

	var mock = {
		last: null,
		log: function() {
			var args = Array.prototype.slice.apply(arguments);
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
	c0.log('yoyo'); test.deepEqual(mock.last, [ '[C1]', 'yoyo' ]);

	var c2 = c1.pushctx('C2');
	c2.log('damn!'); test.deepEqual(mock.last, [ '[C1][C2]', 'damn!' ]);
	c1.log('yoyo'); test.deepEqual(mock.last, [ '[C1][C2]', 'yoyo' ]);
	c0.log('yoyo'); test.deepEqual(mock.last, [ '[C1][C2]', 'yoyo' ]);

	var c3 = c2.popctx().pushctx('C3');
	c3.log('xyz'); test.deepEqual(mock.last, ['[C1][C3]', 'xyz' ]);
	c2.log('damn!'); test.deepEqual(mock.last, [ '[C1][C3]', 'damn!' ]);
	c1.log('yoyo'); test.deepEqual(mock.last, [ '[C1][C3]', 'yoyo' ]);
	c0.log('yoyo'); test.deepEqual(mock.last, [ '[C1][C3]', 'yoyo' ]);

	var i = 10;
	var c4 = c3.pushctx(function() { return i++; });
	c4.log("popo"); test.deepEqual(mock.last, [ '[C1][C3][10]', "popo" ]);
	c4.log("popo"); test.deepEqual(mock.last, [ '[C1][C3][11]', "popo" ]);
	c4.log("popo"); test.deepEqual(mock.last, [ '[C1][C3][12]', "popo" ]);
	c4.log("popo"); test.deepEqual(mock.last, [ '[C1][C3][13]', "popo" ]);

	var c5 = c4.timestamp();
	c5.log("ts"); 
	test.deepEqual(mock.last.length, 2);
	var ctx5 = mock.last[0].split('][');
	test.ok(ctx5[3].indexOf("T") !== -1 && ctx5[3].indexOf("Z") !== -1);

	test.done();
};

