var SqMatrix = require ('./SqMatrix');

var m = new SqMatrix(4);
var n = new SqMatrix(4);
m.makeCheckerBoard();

n.setWithArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);



console.log(n.matrix);


