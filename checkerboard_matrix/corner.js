var fs = require ('fs');
var assert = require ('assert');
var SqMatrix = require('../squareMatrix/sqmatrix');

var fileIn = process.argv[2];
var fileOut = fileIn.split('.');
fileOut.pop();
fileOut.push('out');
fileOut = fileOut.join('.');

var input = fs.readFileSync(fileIn, {encoding: "utf-8"});
var output = ""

var input = input.split(/[ |\n]/g);
input.pop();
var cases = input.shift();

console.time('elapsed');

// solve problem
//
// 1 0 1 0
// 0 1 0 1
// 1 0 1 0
// 0 1 0 1
//
// 1 1 0 0
// 0 0 1 1
// 1 1 0 0
// 0 0 1 1
//
// 1 1 0 0
// 0 0 1 1
// 0 0 1 1
// 1 1 0 0
//

var N = 0, S = 0,
	board = null,
	partial = null,
	moves = null,
	xMoves=0, yMoves=0,
	checkerB = null,
	sums = 0,
	xor = null;


for (var ca = 1; ca <= cases; ca++) {
	
	S = (input.shift()|0);
	N = S*2;
	B = new SqMatrix(N);
	checkerB = new SqMatrix(N);
	checkerB.makeCheckerBoard();
	
	moves = false;

	for(var r = 0; r < N; r++){
		var c = 0, row = input.shift().split('').map(function(e){
			B.matrix[c + r*N] = e|0;
			c++;
		});
	}


	// check if already a checker board
	xor = B.XORme(checkerB);
	// if exclusive or is all 0 the no swaps
	if (xor.SUM() === 0) {
		moves = 0;
		output += "Case #"+ca+": "+moves+'\n';
		continue;
	}

	// if exclusive or is all 1 then all columns or all rows need to swap
	if (xor.SUM() === xor.L) {
		moves = 0;
		output += "Case #"+ca+": "+moves+'\n';
		continue;
	}

	// basic check if each column / row contains equal number of true/false
	sums = B.sums();
	for (var n = 0; n < N; n++){
		if (sums[0][n] !== S || sums[1][n] !== S) {
			moves = "IMPOSSIBLE";
			break;
		}
	}

	// validate pattern
	var col = xor.colAsArray(0), colSum = col.reduce(function(a,b){return a+b;});
	var row = xor.rowAsArray(0), rowSum = row.reduce(function(a,b){return a+b;});;
	
	for (var n = 1; n < N; n++){
		var ccol = xor.colAsArray(n);
		var crow = xor.rowAsArray(n);

		var compCol = Array.prototype.reduce.call(SqMatrix.XOR(col, ccol),function(a,b){return a+b;});
		var compRow = Array.prototype.reduce.call(SqMatrix.XOR(row, crow),function(a,b){return a+b;});

		//console.log(col, ccol);
		//console.log(compCol, compRow);

		if ( (0 < compCol && compCol < N) && (0 < compRow && compRow < N) ) {
			moves = "IMPOSSIBLE";
			break;
		}
	}

	// if (xor.colAsArray(0))

	if (!moves && moves !== 0){
		var swapCols = rowSum > S ? S - rowSum/2 : rowSum/2;
		var swapRows = colSum > S ? S - colSum/2 : colSum/2;

		//var swapCols = rowSum/2;
		//var swapRows = colSum/2;

		moves = swapCols + swapRows;
		console.log(ca, swapCols, swapRows);
	}


	output += "Case #"+ca+": "+moves+'\n';

}



// closeup
console.timeEnd('elapsed');

fs.writeFileSync(fileOut, output, {encoding: "utf-8"});
