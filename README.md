# ctxobj #

[![Build Status](https://secure.travis-ci.org/anodejs/node-ctxobj.png?branch=master)](http://travis-ci.org/anodejs/node-ctxobj)

Adds context to objects. Good for contextual logging.

## ctxobj.new(obj) ##

Decorates `obj` with a context. `pushctx` or `popctx` will extende context.

```nodejs
var ctxobj = require('ctxobj');

// just an object
var obj0 = { x: 1, y: { val: 2 } };

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
```

Output:

```
c1
```

## ctxobj.console(console) ##

Decorates console-like objects with a context that is prepended to each `console.xxx()` call.

```node.js
var ctxobj = require('ctxobj');

var log0 = ctxobj.console(console);
log0.info('no context yet');

var i = 0;
var log1 = log0.pushctx('c1').pushctx(function() { return i++; });
log1.warn('now with a two items in the context');
log1.info('yo yo yo');

var log2 = log1.popctx();
log2.error('only one item in the context now');
```

Output:

```
no context yet
[c1][0] now with a two items in the context
[c1][1] yo yo yo
[c1] only one item in the context now
```

Some sugar:

### ctxobj.timestamp() ###
Pushes a timestamp function to the context

### ctxobj.stacktop(skip) ###
Pushes file name and line number of log line to the context (skipping `skip` frames).

## Licence ##

MIT