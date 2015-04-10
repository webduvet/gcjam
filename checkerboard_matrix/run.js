// get file
var fs = require ('fs');
var assert = require ('assert');

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
	partial = 0,
	move= null,
	mati = null;


for (var ca = 1; ca <= cases; ca++) {
	
	N = (+input.shift()) * 2 ;
	board = [];
	map = []
	X = [];
	invX = [];
	R = [];
	partial = 0;
	moves = null;


	
	for (var y = 0; y < N; y++) {
		board.push(input.shift().split('').map(function(el){
			return !!+el;
		}));
		X.push(board[y]);
		R.push(new Array(N));

		if ( board[y].reduce(count) != N/2 ) {
			moves = "IMPOSSIBLE";
			break;
		}

	}

	// check if valid

	if (!moves){
		for (var y = 0; y < N; y++) {
			var c = 0;
			for (var x =0; x < N; x++){
				if (X[x][y]) c++;
			}
			if (c != N/2){
				moves = "IMPOSSIBLE";
				break;
			}
		}
	}

	if (!moves){
		for (var y = 0; y < N; y++) {
			X[y].forEach(function(el, x, arr){
				//arr[x] = !!((x+y+2) % 2) && el;
				arr[x] = !!((x+y+1) % 2);
				arr[x] = !((arr[x] && !el) || (!arr[x] && el));
			});
		}

		for (var x = 0; x < N; x++){
			for (var y = 0; y < N; y++){
				R[x][y] = R [y][x] = X[x][y] && X[y][x];
			}
		}

		R.forEach(function(row){
			partial += row.reduce(count);
		});


		if (partial % N > 0) {
			moves = 'IMPOSSIBLE';
		} else {
			moves = partial / N;
		}
	}


	console.log(moves);

	// mask it


	output += "Case #"+ca+": "+moves+'\n';


}


function count(pv, cv, i, a){
	return pv + cv;
}


// closeup
console.timeEnd('elapsed');

fs.writeFileSync(fileOut, output, {encoding: "utf-8"});
