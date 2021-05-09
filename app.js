const display = document.getElementById('display');
const numbers = document.getElementsByClassName('num');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const operators = document.getElementsByClassName('op');

let evalString = "0";
let firstNum = "";
let operatorChosen = "";
let secondNum = "";
let decimalChosen = false;
let freshOperation = true;

window.onload = function() {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', handleNum);
    }
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', handleOp);
    }
    equals.addEventListener('click', handleEquals);
    clear.addEventListener('click', handleClear);
    decimal.addEventListener('click', handleDecimal);
}

function updateDisplay() {
    display.innerText = evalString;
    // console.log(firstNum, operatorChosen, secondNum);
}

function handleNum(e) {
    if (!freshOperation) {
        handleClear();
    }
    if (e.target.innerText != "0") {
        if (evalString == "0") {
            evalString = "";
        }
        if (!operatorChosen) {
            if (firstNum.length > 15) {
                return;
            }
            firstNum += e.target.innerText;
            evalString = firstNum;
        } else {
            if (secondNum.length > 15) {
                return;
            }
            secondNum += e.target.innerText;
            evalString = secondNum;
        }
    } else {
        if (evalString == "" || evalString != "0") {
            if (!operatorChosen) {
                firstNum += e.target.innerText;
                evalString = firstNum;
            } else {
                secondNum += e.target.innerText;
                evalString = secondNum;
            }
        }
    }
    updateDisplay();
}

function handleOp(e) {
    if (e.target.innerText == "-") {
        if (firstNum == "") {
            firstNum = "-";
            return;
        } else if (secondNum == "" && operatorChosen) {
            secondNum = "-";
            return;
        }
    } else if (secondNum == "-") {
        secondNum = "";
    }
    if (secondNum != "" && secondNum != "-") {
        handleEquals();
    }
    if (e.target.innerText != "%" && e.target.innerText != "X") {
        operatorChosen = e.target.innerText;
    } else if (e.target.innerText == "%") {
        operatorChosen = "/";
    } else if (e.target.innerText == "X") {
        operatorChosen = "*";
    }
    freshOperation = true;
    decimalChosen = false;
}

function handleEquals() {
    if (firstNum != "" && secondNum != "") {
        let s1 = firstNum.toString() + " ";
        let s2 = operatorChosen.toString() + " ";
        let s3 = secondNum.toString();
        firstNum = eval(s1 + s2 + s3);
        firstNum =  Math.round(firstNum * Math.pow(10, 15)) / Math.pow(10, 15);
        secondNum = "";
        evalString = firstNum;
        operatorChosen = "";
        decimalChosen = false;
        updateDisplay();
    } else if (firstNum == "") {
        handleClear();
        return;
    } else if (secondNum == "") {
        // firstNum and decimalChosen do not change
        secondNum = "";
        evalString = firstNum;
        operatorChosen = "";
        updateDisplay();
    }
    freshOperation = false;
}

function handleClear() {
    firstNum = "";
    secondNum = "";
    evalString = "0";
    operatorChosen =  "";
    decimalChosen = false;
    freshOperation = true;
    updateDisplay();
}

function handleDecimal() {
    if (decimalChosen) {
        return;
    }
    if (evalString.length > 15) {
        return;
    }
    if (!operatorChosen) {
        if (firstNum == "") {
            firstNum += "0";
        }
        firstNum += ".";
        evalString = firstNum;
    } else {
        if (secondNum == "") {
            secondNum += "0";
        }
        secondNum += ".";
        evalString = secondNum;
    }
    decimalChosen = true;
    updateDisplay();
}