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


var N = 0, A = 0, B = 0, split = 0, rem = 0, days = 0, exit = false, splitX = 0, splitY = 0;

for (var ca = 1; ca <= cases; ca++) {
	N = +input.shift();
	A = +input.shift();
	B = +input.shift();
	days = 0;
	splitX = 0;
	splitY = 0;


	var k = B / A,
		kf = Math.round(k);


	if (N < 2) {
		days = 0;
	}
	else if ( N < B) {
		days = (N-1) * A;
	}
	else {
		do {

			//split = Math.floor(N/2) + Math.round(k/2);

			var diff = (N-k)/2;


			splitX = diff; //Math.round(diff);
			splitY = diff + k; //Math.round(diff + k);
			if ( (splitX + k) > (splitY + k) ) {
				splitX -= 1;
				splitY += 1;
			}
			if (splitX < k) {
				exit = true;
				days += Math.round((splitY) * A);
			} else {
				exit = false;
				N = Math.splitY;
				days += A;
			}

		} while(!exit);
	}

	console.log("Case #"+ca+': '+days);


	output += "Case #"+ca+": "+days+'\n';


}



// closeup
console.timeEnd('elapsed');

fs.writeFileSync(fileOut, output, {encoding: "utf-8"});
