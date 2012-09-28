var ctxobj = require('../main');

// just an object
var obj0 = { x: 1, y: { val: 2 } }

// decorate with context
var obj1 = ctxobj.new(obj0)

// decorate with context
var obj1 = ctxobj.new(obj0);

// push and pop data to the context
obj1.pushctx('c1')
obj1.pushctx('c2a').pushctx('c2b')
obj1.popctx().popctx();

// enumarate contexts
obj1.forEachCtx(function(c) {
  console.log(c);
});