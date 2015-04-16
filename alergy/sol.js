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


var N = 0, A = 0, B = 0, split = 0, rem = 0, days = 0, exit = false;

for (var ca = 1; ca <= cases; ca++) {
	N = +input.shift();
	A = +input.shift();
	B = +input.shift();
	days = 0;


	var k = B / A,
		kf = Math.round(k);


	if (N < 2) {
		days = 0;
	}
	else if ( N < 4) {
		days = (N-1) * A;
	}
	else {
		do {

			//split = Math.floor(N/2) + Math.round(k/2);

			var halfX = Math.floor(N/2), halfY = N - halfX;


			while ((halfX + B) > (halfY + A)) {
				halfX -=1;
				halfY +=1;
			}

			// check if the rest can be split or not

			if (halfY < 4) {
				days += A;
				days += A * (halfY-1);
				exit = true;
			} else {
				days += A;
				exit = false;
				N = halfY;
			}

		} while(!exit);
	}

	console.log("Case #"+ca+': '+days);


	output += "Case #"+ca+": "+days+'\n';


}



// closeup
console.timeEnd('elapsed');

fs.writeFileSync(fileOut, output, {encoding: "utf-8"});
