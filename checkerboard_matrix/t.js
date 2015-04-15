"use strict";

var D = {
	p: "original",
	o: {
		nested: "nested"
	}
};

console.log(Object.getOwnPropertyDescriptor(D, 'p'));
//Object.freeze(D);


Object.defineProperty(D, 'p',{
	writable: false,
	enumerable: true,
	configurable: false,
	value: D.p
});

console.log(Object.getOwnPropertyDescriptor(D, 'p'));


var DD = Object.create(D);

var A = Object.create(DD);

try {
	A.p = 'new';
} catch(e){
	console.log(e.stack);

}

A.o.nested = "hey";

console.log(A.__proto__);
console.log(A.p, D.p, DD.p);
console.log(A.o, D.o, DD.o);
