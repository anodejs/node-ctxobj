# ctxobj #

[![Build Status](https://secure.travis-ci.org/anodejs/node-ctxobj.png)](http://travis-ci.org/anodejs/node-ctxobj)

Adds immutable context to objects. Good for contextual logging.

## ctxobj.new(obj) ##

Decorates `obj` with a context. `pushctx` or `popctx` will create a child-object with the extended context.
Child objects maintains an invisible link to parents.

```nodejs
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
```

Output:

```js
obj0 --> { x: 1,  y: { val: 99 }, ctx: undefined }
obj1 --> { x: 1,  y: { val: 99 }, ctx: [] }
obj2 --> { x: 1,  y: { val: 99 }, ctx: [ 'c1' ] }
obj3 --> { x: 1,  y: { val: 99 }, ctx: [ 'c1', 'c2a', 'c2b' ] }
obj4 --> { x: 1,  y: { val: 99 }, ctx: [ 'c3' ] }
obj5 --> { x: 99, y: { val: 99 }, ctx: [ 'c1' ] }
```

## ctxobj.console(console) ##

Decorates console-like objects with a context that is prepended to each `console.xxx()` call.

```node.js
var ctxobj = require('ctxobj');

var log0 = ctxobj.console(console);
log0.info('no context yet');

var log1 = log0.pushctx('c1').pushctx('c2');
log1.warn('now with a two items in the context');

var log2 = log1.popctx();
log2.error('only one item in the context now');
```

Output:

```
no context yet
[c1] [c2] now with a two items in the context
[c1] only one item in the context now
```

## ctxobj.object(parent) ##

Creates a child object from to `parent`. The child object is linked to that parent object
via it's prototype, so properties of the parent object are available through the child.

Inspired by Douglas Crockford’s [parasitic inheritence](http://www.crockford.com/javascript/inheritance.html).

## Licence ##

MIT