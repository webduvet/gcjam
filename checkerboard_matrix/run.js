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
//console.log(input);

// solve problem

var N = 0,
	board = null,
	mat = null,
	R = null,
	partial = null,
	move= null,
	checkboard = null;
	mati = null;


for (var ca = 1; ca <= cases; ca++) {
	
	N = (+input.shift()) * 2 ;
	B = new SqMatrix(N);
	checkerB = new SqMatrix(N);
	checkerB.makeCheckerBoard();
	
	invX = [];
	R = [];
	moves = null;

	for(var r = 0; r < N; r++){
		var c = 0, row = input.shift().split('').map(function(e){
			B.matrix[c + r*N] = e|0;
			c++;
		});
	}

	var partial = checkerB.match(B);

	partial.foldAND();

	var matches = partial.SUM();
	if(matches > B.L / 2) matches = B.L - matches;
	console.log(matches);

	moves = matches % 4 ? "IMPOSSIBLE" : matches / 4;

	output += "Case #"+ca+": "+moves+'\n';


}


function count(pv, cv, i, a){
	return pv + cv;
}

// closeup
console.timeEnd('elapsed');

fs.writeFileSync(fileOut, output, {encoding: "utf-8"});
