function getNumber(id) {
    return parseInt(document.getElementById(id).value);
}

function setResult(result) {
    document.getElementById("result").innerHTML = result;
}

function plus() {
    setResult(getNumber("firstValue") + getNumber("secondValue"));
}

function subtr() {
    setResult(getNumber("firstValue") - getNumber("secondValue"));
}

function mult() {
    setResult(getNumber("firstValue") * getNumber("secondValue"));
}

function division() {
    if (getNumber("secondValue") != 0) setResult(getNumber("firstValue") / getNumber("secondValue"));
    else setResult("Division by zero");
}