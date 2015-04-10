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

var m = new SqMatrix(4);

console.log(m.matrix);
