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
    var max = this.maxJump(Rest.length);
    if (max.dist === Rest.length) {
        if (sol > pass + 1 || sol === -1) {
			sol = pass + 1;
		}
		return;
    }
    for (var i = max.n; i > 1; i--){
        if ( Rest[this.get(i)-1 ] === 1 ){
			if (sol > pass + 1 || sol === -1) {
				this.findJump(Rest.slice( this.get(i), Rest.length), pass+1);
			} else return;
        }
    }
}

var f = null;

function solution(A) {
    
	//add bank
	Array.prototype.push.call(A, 1);
	var f = new Fib(A.length);

    f.findJump(A, 0);
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
var big = new Array(10000);

for (var i = 0; i < big.length; i++){
	big[i] = Math.round(Math.random()*Math.random()) | 0;
}

console.time('time');
console.log( solution(big) );
console.timeEnd('time');
