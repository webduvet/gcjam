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
var cases = input.shift();

console.time('elapsed');

// solve problem

var X = 0, F = 0, C = 0, n = 0, time = 0, previousTime = 0;
var diff = 0, acc = 0;

for ( var ca = 1; ca <= cases; ca ++ ) {
	

	C = input.shift();
	F = input.shift();
	X = input.shift();
	n = 0;
	acc = 0;

	time = X / 2;
	diff = time;

	do
	{
		n++;
		acc += C / (2 + (n-1)*F);
		base = X / (2 + n * F);
		previousTime = time;
		time = base + acc;


	} while (previousTime > time);

	output += "Case #"+ca+": "+ previousTime.toFixed(7) + "\n";

	process.stdout.write('.');
}

console.timeEnd('elapsed');

fs.writeFileSync(fileOut, output, {encoding: "utf-8"});
