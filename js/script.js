const numberButtons = document.querySelectorAll('.numbers');
const outputScreen = document.getElementById('output-text');
const acButton = document.getElementById('AC');
const addButton = document.getElementById('addition');
const subtractButton = document.getElementById('subtraction');
const multiplyButton = document.getElementById('multiply');
const divisionButton = document.getElementById('division');
const equalButton = document.getElementById('equal');

let displayNumber = BigInt(0);
let newDisplayNumber = 0;
let addFlag = 0;
let subtractFlag = 0;
let multiplyFlag = 0;
let divisionFlag = 0;

function numberButtonFunction(event){
    const numberClicked = this.value;
    if(outputScreen.textContent == 0) outputScreen.textContent = '';
    displayNumber = outputScreen.textContent += numberClicked;
}

function acButtonFunction(){
    outputScreen.textContent = '0' ;
    addFlag = 0;
    subtractFlag = 0;
    multiplyFlag = 0;
    divisionFlag = 0;
}

function addFunction(event){

    if(!flagCheck()) return

    displayNumber = outputScreen.textContent += ' + ';
    addFlag = 1;
    
}

function subtractFunction(event){

    if(!flagCheck()) return

    displayNumber = outputScreen.textContent += ' - ';
    subtractFlag = 1;
    
}

function multiplyFunction(event){

    if(!flagCheck()) return

    displayNumber =outputScreen.textContent += ' * ';
    multiplyFlag = 1;
    
}

function divisionFunction(event){

    if(!flagCheck()) return

    displayNumber = outputScreen.textContent += ' % ';
    divisionFlag = 1;
    
}

function flagCheck() {
    return addFlag == 0 && subtractFlag == 0 && multiplyFlag == 0 && divisionFlag == 0;
}

function whichFlag(){
    if(addFlag == 1) return '+';
    if(subtractFlag == 1) return '-';
    if(multiplyFlag == 1) return '*';
    if(divisionFlag == 1) return '%';
}

function equalFunction() {
    if(flagCheck()) return;

    let output = 0;

    output = displayNumber.split(' ' + whichFlag() + ' ');
    console.log(output);

if(whichFlag() == '+')
{
    output = parseInt(output[0]) + parseInt(output[1]);
}

 if(whichFlag() == '-')
{
    output = parseInt(output[0]) - parseInt(output[1]);
} 

if(whichFlag() == '*')
{
    output = parseInt(output[0]) * parseInt(output[1]);
}

if(whichFlag() == '%')
{
    output = parseInt(output[0]) / parseInt(output[1]);
}

    displayNumber = outputScreen.textContent = Math.round(output);

    addFlag = 0;
    subtractFlag = 0;
    multiplyFlag = 0;
    divisionFlag = 0;
}

numberButtons.forEach(button => button.addEventListener('click', numberButtonFunction));

acButton.addEventListener('click', acButtonFunction);

addButton.addEventListener('click', addFunction);
subtractButton.addEventListener('click', subtractFunction);
multiplyButton.addEventListener('click', multiplyFunction);
divisionButton.addEventListener('click', divisionFunction);
equalButton.addEventListener('click', equalFunction);