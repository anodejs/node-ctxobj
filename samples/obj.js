var ctxobj = require('../main');

// just an object
var obj0 = { x: 1, y: { val: 2 } }

// decorate with context
var obj1 = ctxobj.new(obj0)

// create child objects by pushing and poping data to the context
var obj2 = obj1.pushctx('c1')
var obj3 = obj2.pushctx('c2a').pushctx('c2b')
var obj4 = obj1.pushctx('c3')
var obj5 = obj3.popctx().popctx();

// this will only change 'x' on obj5
obj5.x = 99;

// this will change y.val on all the objects (because we are not setting `y` itself)
obj5.y.val = 99;




[ obj0, obj1, obj2, obj3, obj4, obj5 ].map(function(o) {
	console.log({ x: o.x, y: o.y, ctx: o.ctx });
});
