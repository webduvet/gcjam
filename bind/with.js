
/*
var X = function(){
	this.x = "my value X";
	this.print = function(){
		console.log(this.x);
	};
}

var x = new X();

with(x) {
	print();
	console.log(x);
}
*/

this.me = "test me"

var Pool = function(arr){
	this.L = arr.length;
	with(Array.prototype) {
		this.getLast = function(){
			return pop.call(arr);
		}

		console.log(pop);
	}
};


var a = [1,2,3,4,5,6];

var p = new Pool(a);

console.log(p.getLast());
console.log(a);
