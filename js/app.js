let childScreen = document.getElementById("child-screen");
let mainScreen = document.getElementById("output-screen");
let errorMessage = document.getElementById('error-message');
let memoryItems = [];
checkMemory();

function displayEntry(value) {
    if (ValidateInput(value)) {
        mainScreen.innerHTML += value;
    }
}

function Calculator() {
    try {
        childScreen.innerHTML = mainScreen.innerHTML;
        let count = eval(mainScreen.innerHTML);
        mainScreen.innerHTML = count;
    } catch (err) {
        errorMessage.innerHTML = "<div class='alert alert-danger w-25' role='alert'>Invalid Input!!</div>";
        window.setTimeout(function () {
            errorMessage.innerHTML = "";
        }, 3000);
    }
}

function allClear() {
    mainScreen.innerHTML = "";
    childScreen.innerHTML = "";
}

function clearEntry() {
    if (mainScreen.innerHTML == "") {
        childScreen.innerHTML = childScreen.innerHTML.slice(0, -1);
    } else {
        mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1);
    }
}

function getConstant(clicked_id) {
    if (clicked_id == "PI") {
        mainScreen.innerHTML += Math.PI;
    }
    else {
        mainScreen.innerHTML += Math.E;
    }
}

function getDerivative() {
    mainScreen.innerHTML = eval(1 / mainScreen.innerHTML);
}
function getAbsoluteValue() {
    mainScreen.innerHTML = Math.abs(mainScreen.innerHTML);
}

function getModulo() {
    if (ValidateInput('%')) {
        mainScreen.innerHTML += '%';
    }
}

function getExponent() {
    mainScreen.innerHTML = Math.exp(mainScreen.innerHTML);
}

function getFactorial() {
    let factorialNumber = mainScreen.innerHTML;
    if (factorialNumber < 0) {
        errorMessage.innerHTML = "<div class='alert alert-danger w-25' role='alert'>Invalid Input!!</div>";
        window.setTimeout(function () {
            errorMessage.innerHTML = "";
        }, 3000);
    } else if (factorialNumber == 0) {
        mainScreen.innerHTML = "1";
    } else {
        for (var i = factorialNumber - 1; i >= 1; i--) {
            factorialNumber *= i;
        }
        mainScreen.innerHTML = factorialNumber;
    }
}

function getPower(clicked_id) {
    if (clicked_id == "findSquare") {
        mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 2);
    } else if (clicked_id == "findXRoot") {
        mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 1 / 2);
    } else if (clicked_id == "findTenPower") {
        mainScreen.innerHTML = Math.pow(10, mainScreen.innerHTML);
    }
}

function getLog(clicked_id) {
    if (clicked_id == "logTenBase") {
        mainScreen.innerHTML += Math.log10(mainScreen.innerHTML);
    } else if (clicked_id == "naturalLogarithm") {
        mainScreen.innerHTML += Math.log(mainScreen.innerHTML);
    }
}

function setPlusMinus() {
    let firstOperator = mainScreen.innerHTML.charAt(0);
    if (firstOperator == "-") {
        getAbsoluteValue();
    } else {
        mainScreen.innerHTML = mainScreen.innerHTML.slice(0, 0) + "-" + mainScreen.innerHTML.slice(0);
    }
}

function ValidateInput(value) {
    let lastEntry = mainScreen.innerHTML.slice(-1);
    let operators = ["%", "+", "-", "*", "/", "."];
    if (operators.includes(value)) {
        if (operators.includes(lastEntry)) {
            return false;
        }
        else {
            return true;
        }
    }
    return true;
}

function memoryStore() {
    const storedMemoryData = JSON.parse(localStorage.getItem('calcmemory'));
    if (mainScreen.innerHTML != "") {
        if (storedMemoryData != null) {
            storedMemoryData.push(mainScreen.innerHTML);
            localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
        }
        else {
            memoryItems.push(mainScreen.innerHTML)
            localStorage.setItem("calcmemory", JSON.stringify(memoryItems));
        }
    }

}

function memoryPlusSubtract(clicked_id) {
    const storedMemoryData = JSON.parse(localStorage.getItem('calcmemory'));
    if (mainScreen.innerHTML != "") {
        if (storedMemoryData != null) {
            let lastItems = storedMemoryData.length - 1;
            if (clicked_id == "memory-plus") {
                let replacement = eval(storedMemoryData[lastItems] + "+" + mainScreen.innerHTML);
                storedMemoryData[lastItems] = replacement;
                localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
            } else if (clicked_id == "memory-subtract") {
                let replacement = eval(storedMemoryData[lastItems] + "-" + mainScreen.innerHTML);
                storedMemoryData[lastItems] = replacement;
                localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
            }
            else {
                localStorage.removeItem('calcmemory');
                checkMemory();
            }
        }
        else {
            return false;
        }
    }
}

function memoryRecall() {
    let retrievedMemoryData = localStorage.getItem("calcmemory");
    let memoryData = JSON.parse(retrievedMemoryData);
    mainScreen.innerHTML = memoryData[memoryData.length - 1]
}

function checkMemory() {
    const storedMemoryData = JSON.parse(localStorage.getItem('calcmemory'));
    let memoryClear = document.getElementById("memory-clear");
    let memoryRecall = document.getElementById("memory-recall");
    if (storedMemoryData == null) {
        memoryClear.className += " disabled";
        memoryRecall.className += " disabled";
    } else {
        memoryClear.setAttribute("class", "btn")
        memoryClear.setAttribute("class", "btn")
    }
};

