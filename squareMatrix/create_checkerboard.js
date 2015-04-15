
/**
 * @param {Number} should be even number to have a valid checker board
 */
function createCheckerBoard(N, start){
	var arr = new Array(N*N),
		val = true;

	for (var i = 0; i < N*N; i++){
		if ( (i % N) ) val = !val;
		arr[i] = val;
	}

	return arr;
}

function createCheckerBoard_U(N,start){
	var arr = [],
		val = true;

	for (var i = 0; i < N*N; i++){
		if ( (i % N) ) val = !val;
		arr.push(val);
	}

	return arr;
}

function createCheckerBoard_8(N, start){
	var arr = new Uint8Array(N*N),
		val = true;

	for (var i = 0; i < N*N; i++){
		if ( (i % N) ) val = !val;
		arr[i] = val;
	}

	return arr;
}


/*
console.time('small A');
var A = createCheckerBoard (100);
console.timeEnd('small A');
console.time('small B');
var B = createCheckerBoard2(100);
console.timeEnd('small B');

console.time('large B');
var B = createCheckerBoard_U(4000);
console.timeEnd('large B');

*/

console.time('large U8');
var U8 = createCheckerBoard_8(9000);
console.timeEnd('large U8');

console.time('large U');
var A = createCheckerBoard(9000);
console.timeEnd('large U');
