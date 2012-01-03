var ctxobj = require('../main');

var log0 = ctxobj.console(console);
log0.info('no context yet');

var log1 = log0.pushctx('c1').pushctx('c2');
log1.warn('now with a two items in the context');

var log2 = log1.popctx();
log2.error('only one item in the context now');



