let input1El = document.getElementById('firstNumber');
let input2El = document.getElementById('secondNumber');
let resultEl = document.getElementById('result');
let result;

function multiplyBy() {
    let input1 = input1El.value;
    let input2 = input2El.value;
    if (isNaN(input1 || input2)) result = "Not a number";
    else result = input1 * input2;
    resultEl.innerHTML = result;
}

function divideBy() {
    let input1 = input1El.value;
    let input2 = input2El.value;
    if (isNaN(input1 || input2)) result = "Not a number";
    else if (input2 === 0) result = "Division by zero";
    else result = input1 / input2;
    resultEl.innerHTML = result;
}

