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
SqMatrix.prototype.foldAND = function(){
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
SqMatrix.prototype.foldMatch = function(){
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
	var val = false;

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

Object.defineProperties(SqMatrix,{
	"AND":{
		enumerable: false,
		configurable: false,
		writable: false,
		value: function(A,B){
			if ( A.length !== B.length) throw new Error("matrices must be of the same size");
			//var C = new SqMatrix(A.N);
			var C = new Uint8Array(A.length);
			for(var z = 0; z < A.length; z++){
				C[z] = A[z] && B[z];
			}
			return C;
		}
	},
	"OR":{
		enumerable: false,
		configurable: false,
		writable: false,
		value: function(A,B){
			if ( A.length !== B.length) throw new Error("matrices must be of the same size");
			//var C = new SqMatrix(A.N);
			var C = new Uint8Array(A.length);
			for(var z = 0; z < A.length; z++){
				C[z] = A[z] || B[z];
			}
			return C;
		}
	},
	"XOR":{
		enumerable: false,
		configurable: false,
		writable: false,
		value: function(A,B){
			if ( A.length !== B.length) throw new Error("matrices must be of the same size");
			//var C = new SqMatrix(A.N);
			var C = new Uint8Array(A.length);
			for(var z = 0; z < A.length; z++){
				C[z] = (!A[z] && B[z]) || (A[z] && !B[z]);
			}
			return C;
		}
	}
});


/**
 * create new matrix as result of logical XOR on two given matrices
 *
 * @param {SqMatrix} instance of N by N matrix
 * @resturns {SqMatrix} instance of new matrix
 */
SqMatrix.prototype.XORme = function(B){
	if ( this.L !== B.L) throw new Error("matrices must be of the same size");
	var C = new SqMatrix(this.N);
	for(var z = 0; z < this.L; z++){
		C.matrix[z] = (!this.matrix[z] && B.matrix[z]) || (this.matrix[z] && !B.matrix[z]);
	}
	return C;
};

/**
 * create new matrix as result of logical AND on two given matrices
 *
 * @param {SqMatrix} instance of N by N matrix
 * @resturns {SqMatrix} instance of new matrix
 */
SqMatrix.prototype.ANDme = function(B){
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

/**
 * get a Nth row from the matrix
 * @param {int}
 * @returns {Array} new Array with copied values of existing
 */
SqMatrix.prototype.getRow = function(r,n){
	var row = new Uint8Array(this.N);

	for (var i = 0; i < this.N; i++) {
		row[i] = this.matrix[i + r*this.N];
	}
	return row;
}
/**
 * get a Nth column from the matrix
 * @param {int}
 * @returns {Array} new Array with copied values of existing
 */
SqMatrix.prototype.getCol = function(c,n){
	var col = new Uint8Array(this.N);

	for (var i = 0; i < this.N; i++) {
		col[i] = this.matrix[c + i*this.N];
	}
	return col;
}

/**
 * get a Nth row from the matrix
 * @param {int}
 * @returns {Array} new Array with copied values of existing
 */
SqMatrix.prototype.rowAsArray = function(r){
	var row = new Array(this.N);

	for (var i = 0; i < this.N; i++) {
		row[i] = this.matrix[i + r*this.N];
	}
	return row;
}
/**
 * get a Nth column from the matrix
 * @param {int}
 * @returns {Array} new Array with copied values of existing
 */
SqMatrix.prototype.colAsArray = function(c){
	var col = new Array(this.N);

	for (var i = 0; i < this.N; i++) {
		col[i] = this.matrix[c + i*this.N];
	}
	return col;
}

/**
 * returns the sum of all values in the matrix
 *
 * @returns {int} 
 */
SqMatrix.prototype.SUM = function(){
	var sum = 0;
	for (var n = 0; n < this.L; n++){
		sum += this.matrix[n];
	}
	return sum;
	//return this.matrix.reduce(function(p,c){return p+c;});
}

/**
 * sums all columns and the result stores in new array
 * it is regular ES5 Array so we can take advantage array methods
 * @returns {Array}
 */
SqMatrix.prototype.sums = function(){
	var sumsRows = new Uint8Array(this.N),
		sumsCols = new Uint8Array(this.N);
	for (var r = 0; r < this.N; r++) {
		for (var c = 0; c < this.N; c++){
			sumsRows[r] += this.matrix[c + r*this.N];
			sumsCols[c] += this.matrix[c + r*this.N];
		}
	}
	return [sumsCols, sumsRows];
}

module.exports = SqMatrix;
