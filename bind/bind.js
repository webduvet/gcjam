function Point() {
	if (Number(arguments.lenght) < 3) {
		console.log('**',arguments.length,'**');
		console.log(arguments.length < 1);
		throw new Error('not enough arguments');
	}

	if (arguments.length|0 === 3) arguments[0] = arguments[2];

	this.x = arguments[0];
	this.y = arguments[1];
}

Point.prototype.toString = function() { 
  return this.x + ',' + this.y; 
};

var p = new Point(1, 2);
p.toString(); // '1,2'


var emptyObj = {};
// var YAxisPoint = Point.bind(emptyObj, 0/*x*/);

// not supported in the polyfill below,
// works fine with native bind:
var YAxisPoint = Point.bind(null, 0/*x*/);
var XAxisPoint = Point.bind(null, null,0); // want to provide second argument

// var YAxisPoint = Point.bind(new Point(), 0/*x*/);

var axisPoint = new YAxisPoint(5);
console.log(axisPoint.toString()); // '0,5'

console.log(axisPoint instanceof Point); // true
console.log(axisPoint instanceof YAxisPoint); // true
console.log(new Point(17, 42) instanceof YAxisPoint); // true

console.log(new XAxisPoint(45).toString());

new Point(1,1);
