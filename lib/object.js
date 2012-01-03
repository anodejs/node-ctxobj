// Crockford's object() function
// http://www.crockford.com/javascript/inheritance.html
// http://yuiblog.com/blog/2006/11/27/video-crockford-advjs/
module.exports = function(o) {
	function Factory() {};
	Factory.prototype = o;
	return new Factory();
}