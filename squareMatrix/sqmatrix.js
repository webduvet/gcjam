/**
 * creates N by N square matrix
 * @construtctor
 *
 * @params {Number} 
 */
var SqMatrix = function(N){
	this.matrix = new Uint8Array(N*N);
	this.N = N;
	this.L = N*N;

};

/**
 * inverse the matrix
 */
SqMatrix.prototype.inv = function(){
	var val = 0;
	for (var y = 0; y < this.N-1 ; y++){
		for (var x = y+1; x < this.N; x++ ) {
			val = this.matrix[x + y*this.N];
			this.matrix[x + y*this.N] = this.matrix[y + x*this.N];
			this.matrix[y + x*this.N] = val;
		}
	}
};

/**
 * fold the matrix along diagonal and perform AND
 * operation ans store the result in both end
 */
SqMatrix.prototype.foldAnd = function(){
	var val = 0;
	for (var y = 0; y < this.N-1 ; y++){
		for (var x = y+1; x < this.N; x++ ) {
			val = this.matrix[x + y*this.N] && this.matrix[y + x*this.N];
			this.matrix[x + y*this.N] = val;
			this.matrix[y + x*this.N] = val;
		}
	}
};

/**
 * fold the matrix along diagonal and perform inverse XOR
 * operation ans store the result in both end
 */
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
};

/**
 * create increment values and populate them in matrix
 */
SqMatrix.prototype.increment = function(){
	for(var z = 0; z < this.L; z++){
		this.matrix[z] = z+1;
	}
};

/**
 * create checkboard matrix 0/1
 */
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
};

/**
 * create new matrix as result of logical AND on two given matrices
 *
 * @param {SqMatrix} instance of N by N matrix
 * @resturns {SqMatrix} instance of new matrix
 */
SqMatrix.prototype.AND = function(B){
	if ( this.L !== B.L) throw new Error("matrices must be of the same size");
	var C = new SqMatrix(this.N);
	for(var z = 0; z < this.L; z++){
		C.matrix[z] = this.matrix[z] && B.matrix[z];
	}
	return C;
};

/**
 * match is the same as inv xor
 */
SqMatrix.prototype.match = function(B){
	if ( this.L !== B.L) throw new Error("matrices must be of the same size");
	var C = new SqMatrix(this.N);
	for(var z = 0; z < this.L; z++){
		//C.matrix[z] = !((!this.matrix[z] && B.matrix[z]) || (this.matrix[z] && !B.matrix[z]));
		C.matrix[z] = this.matrix[z] === B.matrix[z];
	}
	return C;
};

/**
 * populate the N by N matrix with array of values
 * of equals length as the matrix
 * @param {Array} N*N length array
 */
SqMatrix.prototype.setWithArray = function(arr){
	if (this.L !== arr.length) throw new Error("data array length must match the matrix");
	for (var z=0; z < this.L; z++){
		this.matrix[z] = arr[z]|0;
	}
};

module.exports = SqMatrix;
