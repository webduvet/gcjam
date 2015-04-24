var assert = require ('assert');

var sol = -1;

var Fib = function(N){
	this._fibs = [];
    var i = 0, jump = 0, old = 0;
    while ( jump <= N ){
        i++;
		old = jump;
		this._fibs.push(old);
		jump = fib(i);
		
    }
}

Fib.prototype.get = function(x){ return this._fibs[x];};
Fib.prototype.maxJump = function(L){
    var i = 2, jump = 1, old = 0;
    while ( jump <= L ){
        i++;
		old = jump;
		jump = this.get(i);
    }
    return {
		dist: old,
		n: i-1
	};
};

Fib.prototype.findJump = function(Rest, pass){
	var max = this.maxJump(Rest.byteLength);
	pass++;
	if (max.dist === Rest.byteLength) {
        if (sol > pass || sol === -1) {
			sol = pass;
		}
		return;
    }
    for (var i = max.n|0; i > 1; i--){
        if ( Rest.getUint8( this.get(i)-1 ) ){
			// TODO count stones for each stretch
			//
			if ( pass < stones && (sol > pass || sol === -1) ) {
				var deeperView = new DataView( Rest.buffer, Rest.byteOffset + this.get(i));
				// process.stdout.write('.');
				iters++;
				this.findJump(deeperView, pass);
			} else return;
        }
    }
}

var f = null, stones = 0, iters = 0;

function solution(A) {

	console.time('boot');

	stones = A.reduce(function(p,n){return p + n;});
	//add bank
	Array.prototype.push.call(A, 1);

	var buffer = new ArrayBuffer(A.length);
	var view = new DataView(buffer);
	for (var x = 0; x < A.length; x++){
		if( A[x] ) view.setUint8(x, 1);
		else view.setUint8(x, 0);
	}
	var f = new Fib(A.length);

	console.timeEnd('boot');

	console.time('time');
    f.findJump(view, 0);
	console.timeEnd('time');

	return sol;
}

function fib(N) {
	if (N === 0) return 0;
	if (N === 1) return 1;
    return fib(N-1) + fib(N-2);
}


assert.equal(fib(5), 5, "fib 5 expect 5");


var aa = [0,0, 0, 1,1, 0, 1, 0, 0, 0, 1, 1,0, 0, 1,0, 0, 0, 1, 1,0, 0, 0, 0];

//console.log( solution(a) );

var a = [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0];

var a2 = [0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];

// var big = new Uint8Array(10);
var big = new Array(100000);

for (var i = 0; i < big.length; i++){
	big[i] = Math.round(Math.random()*Math.random()) | 0;
}

console.log( solution(big) );
console.log("stones in river: ", stones);
console.log("iterations run: ", iters);
