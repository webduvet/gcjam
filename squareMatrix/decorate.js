var A = function(name){
	this.name = name;
}

A.prototype.hey = function(){
	return this.name;
}

var AA = function(){
	var ext = arguments.length > 1 ? Array.prototype.pop.call(arguments) : false;
	A.apply(this, arguments);

	if (ext) {
		var hey = this.hey;
		this.hey = function(){
			// return hey.call(this) + ' | '+ ext;
			return AA.prototype.hey.call(this) + ' | '+ ext;
			// var hey is creating closure where the original function is closed
			// on other hand calling prototype will give always the prototypes current function
			// whatever it is changed to later
			// no option is better - depends on design choice
		}
	}
}

AA.prototype = Object.create(A.prototype);
AA.prototype.constructor = AA;

var a = new A('jane');
var aa = new AA('dick', 'tracy');
var bb = new AA('jeff');
var cc = new AA('justin', 'timber');

A.prototype.hey = function(){
	return this.name.toUpperCase();
}

console.log(a.hey());
console.log(aa.hey());
console.log(bb.hey());
console.log(cc.hey());

console.log(bb instanceof A);
