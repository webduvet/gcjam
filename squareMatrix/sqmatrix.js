var SqMatrix = function(N){
	this.matrix = new Uint8Array(N*N);
	this.N = N;
	this.L = N*N;

}


SqMatrix.prototype.inv = function(){
	var val = 0;
	for (var y = 0; y < this.N-1 ; y++){
		for (var x = y+1; x < this.N; x++ ) {
			val = this.matrix[x + y*this.N];
			this.matrix[x + y*this.N] = this.matrix[y + x*this.N];
			this.matrix[y + x*this.N] = val;
		}
	}
}

SqMatrix.prototype.foldAnd = function(){
	var val = 0;
	for (var y = 0; y < this.N-1 ; y++){
		for (var x = y+1; x < this.N; x++ ) {
			val = this.matrix[x + y*this.N] && this.matrix[y + x*this.N];
			this.matrix[x + y*this.N] = val;
			this.matrix[y + x*this.N] = val;
		}
	}
}

SqMatrix.prototype.foldXorInv = function(){
	var val = 0;
	for (var y = 0; y < this.N-1 ; y++){
		for (var x = y+1; x < this.N; x++ ) {
			//val = !((!this.matrix[x + y*this.N] && this.matrix[y + x*this.N]) || (this.matrix[x + y*this.N] && !this.matrix[y + x*this.N]));
			val = this.matrix[x + y*this.N] === this.matrix[y + x*this.N];
			this.matrix[x + y*this.N] = val;
			this.matrix[y + x*this.N] = val;
		}
	}
}

SqMatrix.prototype.increment = function(){
	for(var z = 0; z < this.L; z++){
		this.matrix[z] = z+1;
	}
}

SqMatrix.prototype.makeCheckerBoard = function(){
	var val = true;

	if (this.N % 2) {
		for (var i = 0; i < this.L; i++){
			val = !val;
			this.matrix[i] = val;
		}
	} else {
		for (var i = 0; i < this.L; i++){
			if ( (i % this.N) ) val = !val;
			this.matrix[i] = val;
		}
	}
}

SqMatrix.prototype.and = function(B){
	if (! this.L === B.L) throw new Error("matrices must be of the same size");
	var C = new SqMatrix(this.N);
	for(var z = 0; z < this.L; z++){
		C.matrix[z] = this.matrix[z] && B.matrix[z];
	}
	return C;
}

/**
 * match is the same as inv xor
 */
SqMatrix.prototype.match = function(B){
	if (! this.L === B.L) throw new Error("matrices must be of the same size");
	var C = new SqMatrix(this.N);
	for(var z = 0; z < this.L; z++){
		//C.matrix[z] = !((!this.matrix[z] && B.matrix[z]) || (this.matrix[z] && !B.matrix[z]));
		C.matrix[z] = this.matrix[z] === B.matrix[z];
	}
	return C;
}

var m = new SqMatrix(4);

m.makeCheckerBoard();
m.foldXorInv();
console.log(m.matrix);
