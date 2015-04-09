var fs = require ('fs');
var assert = require ('assert');

var input = fs.readFileSync('./A-small-practice.in', {encoding: "utf-8"});
var output = ""


var input = input.split(/[ |\n]/g);
var cases = input.shift();

for (var i = 1; i <= cases; i++){
	var set = null, guess = null, setA=null, setB=null,
		matches = 0, match = null, result = '';

	guess = input.shift();
	set = input.splice(0, 16);
	setA = set.splice(guess * 4 - 4, 4);

	assert.equal(setA.length, 4, setA);

	guess = input.shift();
	set = input.splice(0, 16);
	setB = set.splice(guess * 4 - 4, 4);

	assert.equal(setB.length, 4, setA);
	
	setA.forEach(function(el){
		if ( setB.indexOf(el) > -1 ) {
			matches ++;
			match = el;
		}
	});

	if (matches === 1) result += match;
	else if (matches < 1) result += "Volunteer cheated!";
	else result += "Bad magician!";


	output += "Case #"+i + ": " + result + '\n';
}

fs.writeFileSync('./A-small-practice.out', output, {encoding: "utf-8"});
