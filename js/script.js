const numberButtons = document.querySelectorAll('.numbers');
const outputScreen = document.getElementById('output-text');
const acButton = document.getElementById('AC');
const addButton = document.getElementById('addition');
const subtractButton = document.getElementById('subtraction');
const multiplyButton = document.getElementById('multiply');
const divisionButton = document.getElementById('division');
const equalButton = document.getElementById('equal');

let displayNumber = 0;
let newDisplayNumber = 0;
let addFlag = 0;
let subtractFlag = 0;
let multiplyFlag = 0;
let divisionFlag = 0;

function numberButtonFunction(event) {
	const numberClicked = this.value;
	if (outputScreen.textContent == 0 || outputScreen.textContent == 'NaN' || outputScreen.textContent == 'Infinity')
		outputScreen.textContent = '';
	displayNumber = outputScreen.textContent += numberClicked;
}

function acButtonFunction() {
	outputScreen.textContent = '0';
	addFlag = 0;
	subtractFlag = 0;
	multiplyFlag = 0;
	divisionFlag = 0;
}

function addFunction(event) {
	if (!flagCheck()) return;

	if (outputScreen.textContent == 0 || outputScreen.textContent == 'NaN') outputScreen.textContent = '';

	displayNumber = outputScreen.textContent += ' + ';
	addFlag = 1;
}

function subtractFunction(event) {
	if (!flagCheck()) return;

	if (outputScreen.textContent == 0 || outputScreen.textContent == 'NaN') outputScreen.textContent = '';

	displayNumber = outputScreen.textContent += ' - ';
	subtractFlag = 1;
}

function multiplyFunction(event) {
	if (!flagCheck()) return;

	if (outputScreen.textContent == 0 || outputScreen.textContent == 'NaN') outputScreen.textContent = '';

	displayNumber = outputScreen.textContent += ' * ';
	multiplyFlag = 1;
}

function divisionFunction(event) {
	if (!flagCheck()) return;

	if (outputScreen.textContent == 0 || outputScreen.textContent == 'NaN') outputScreen.textContent = '';

	displayNumber = outputScreen.textContent += ' % ';
	divisionFlag = 1;
}

function flagCheck() {
	return addFlag == 0 && subtractFlag == 0 && multiplyFlag == 0 && divisionFlag == 0;
}

function whichFlag() {
	if (addFlag == 1) return '+';
	if (subtractFlag == 1) return '-';
	if (multiplyFlag == 1) return '*';
	if (divisionFlag == 1) return '%';
}

function roundResult(num) {
	return Math.round(num * 1000) / 1000;
}

// Solution from: https://gist.github.com/jiggzson/b5f489af9ad931e3d186

let scientificToDecimal = function(num) {
	let nsign = Math.sign(num);
	//remove the sign
	num = Math.abs(num);
	//if the number is in scientific notation remove it
	if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
		let zero = '0',
			parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
			e = parts.pop(), //store the exponential part
			l = Math.abs(e), //get the number of zeros
			sign = e / l,
			coeff_array = parts[0].split('.');
		if (sign === -1) {
			l = l - coeff_array[0].length;
			if (l < 0) {
				num =
					coeff_array[0].slice(0, l) +
					'.' +
					coeff_array[0].slice(l) +
					(coeff_array.length === 2 ? coeff_array[1] : '');
			} else {
				num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
			}
		} else {
			let dec = coeff_array[1];
			if (dec) l = l - dec.length;
			if (l < 0) {
				num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
			} else {
				num = coeff_array.join('') + new Array(l + 1).join(zero);
			}
		}
	}

	return nsign < 0 ? '-' + num : num;
};

//

function equalFunction() {
	if (flagCheck()) return;

	let output = 0;

	output = displayNumber.split(' ' + whichFlag() + ' ');

	if (whichFlag() == '+') {
		output = scientificToDecimal(output[0]) + scientificToDecimal(output[1]);
	}

	if (whichFlag() == '-') {
		output = scientificToDecimal(output[0]) - scientificToDecimal(output[1]);
	}

	if (whichFlag() == '*') {
		output = scientificToDecimal(output[0]) * scientificToDecimal(output[1]);
	}

	if (whichFlag() == '%') {
		output = scientificToDecimal(output[0]) / scientificToDecimal(output[1]);
	}

	displayNumber = outputScreen.textContent = roundResult(output);

	addFlag = 0;
	subtractFlag = 0;
	multiplyFlag = 0;
	divisionFlag = 0;
}

numberButtons.forEach((button) => button.addEventListener('click', numberButtonFunction));

acButton.addEventListener('click', acButtonFunction);

addButton.addEventListener('click', addFunction);
subtractButton.addEventListener('click', subtractFunction);
multiplyButton.addEventListener('click', multiplyFunction);
divisionButton.addEventListener('click', divisionFunction);
equalButton.addEventListener('click', equalFunction);
