let inputData = document.getElementById("input-screen");
let outputData = document.getElementById("output-screen");

function displayEntry(num) {
    outputData.innerHTML += num;
}

function Calculator() {
    try {
        inputData.innerHTML = outputData.innerHTML;
        let count = eval(outputData.innerHTML);
        outputData.innerHTML = count;
    } catch (err) {
        alert("Invalid");
    }
}

function allClear() {
    outputData.innerHTML = "";
    inputData.innerHTML = "";
}

function clearEntry() {
    if (outputData.innerHTML == "") {
        inputData.innerHTML = inputData.innerHTML.slice(0, -1);
    } else {
        outputData.innerHTML = outputData.innerHTML.slice(0, -1);
    }
}

function getConstant(clicked_id) {
    if (clicked_id == "PI") {
        outputData.innerHTML += Math.PI;
    }
    else {
        outputData.innerHTML += Math.E;
    }
}

function getDerivative() {
    outputData.innerHTML = eval(1 / outputData.innerHTML);
}
function getAbsoluteValue() {
    outputData.innerHTML = Math.abs(outputData.innerHTML);
}

function getModulo() {
    validateString("%");
}
function validateString(Symbol) {
    let entry = outputData.innerHTML;
    var lastEntry = entry.charAt(entry.length - 1);
    if (lastEntry != Symbol) {
        outputData.innerHTML += Symbol;
    }
}

function getExponent() {
    outputData.innerHTML = Math.exp(outputData.innerHTML);
}

function getFactorial() {
    let factorialNumber = outputData.innerHTML;
    if (factorialNumber < 0) {
        alert("Invalid Input");
    } else if (factorialNumber == 0) {
        outputData.innerHTML = "1";
    } else {
        for (var i = factorialNumber - 1; i >= 1; i--) {
            factorialNumber *= i;
        }
        outputData.innerHTML = factorialNumber;
    }
}

function getPower(clicked_id) {
    if (clicked_id == "findSquare") {
        outputData.innerHTML = Math.pow(outputData.innerHTML, 2);
    } else if (clicked_id == "findXRoot") {
        outputData.innerHTML = Math.pow(outputData.innerHTML, 1 / 2);
    } else if (clicked_id == "findTenPower") {
        outputData.innerHTML = Math.pow(10, outputData.innerHTML);
    }
}

function getLog(clicked_id) {
    if (clicked_id == "logTenBase") {
        outputData.innerHTML += Math.log10(outputData.innerHTML);
    } else if (clicked_id == "naturalLogarithm") {
        outputData.innerHTML += Math.log(outputData.innerHTML);
    }
}

function setPlusMinus() {
    let firstOperator = outputData.innerHTML.charAt(0);
    if (firstOperator == "-") {
        getAbsoluteValue();
    } else {
        outputData.innerHTML = outputData.innerHTML.slice(0, 0) + "-" + outputData.innerHTML.slice(0);
    }
}
