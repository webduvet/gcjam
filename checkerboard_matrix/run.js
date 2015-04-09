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
	mati = null;


for (var ca = 1; ca <= cases; ca++) {
	
	N = (+input.shift()) * 2 ;
	board = [];
	map = []
	X = [];
	invX = [];
	
	for (var y = 0; y < N; y++) {
		board.push(input.shift().split('').map(function(el){
			//map.push(!!+el);
			return !!+el;
		}));


		X.push(board[y]);
		console.log(X[y]);
		X[y].forEach(function(el, index, arr){
			arr[index] = !!(index % 2) && el;
		});
	}

	console.log(X);



	// mask it


	//console.log(board);


}





// closeup
console.timeEnd('elapsed');

fs.writeFileSync(fileOut, output, {encoding: "utf-8"});
