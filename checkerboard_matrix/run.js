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



// closeup
console.timeEnd('elapsed');

fs.writeFileSync(fileOut, output, {encoding: "utf-8"});
