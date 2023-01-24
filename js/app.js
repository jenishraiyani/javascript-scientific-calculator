let childScreen = document.getElementById("child-screen");
let mainScreen = document.getElementById("output-screen");
let errorMessage = document.getElementById("error-message");
let memoryItems = [];
checkMemory();

// Display user input on screen
function displayEntry(value) {
  if (mainScreen.innerHTML == "0" && value != ".") {
    mainScreen.innerHTML = value;
  } else {
    if (ValidateInput(value)) {
      mainScreen.innerHTML += value;
    }
  }
}

// Calculate
function Calculator() {
  try {
    if (mainScreen.innerHTML != "") {
      if (mainScreen.innerHTML.includes("^")) {
        const findXYSqaure = mainScreen.innerHTML.split("^", 2);
        childScreen.innerHTML = mainScreen.innerHTML;
        mainScreen.innerHTML = Math.pow(findXYSqaure[0], findXYSqaure[1]);
      } else {
        childScreen.innerHTML = mainScreen.innerHTML;
        let count = eval(mainScreen.innerHTML);
        mainScreen.innerHTML = count;
      }
    }
  } catch (err) {
    errorMessage.innerHTML =
      "<div class='alert alert-danger w-25' role='alert'>Invalid Input!!</div>";
    window.setTimeout(function () {
      errorMessage.innerHTML = "";
    }, 3000);
  }
}

//Remove all the entry from screen
function allClear() {
  mainScreen.innerHTML = "";
  childScreen.innerHTML = "";
}

//Remove last entry
function clearEntry() {
  if (mainScreen.innerHTML == "") {
    childScreen.innerHTML = childScreen.innerHTML.slice(0, -1);
  } else {
    mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1);
  }
}

function fixedToExponent() {
  mainScreen.innerHTML += ".e+0";
}

function getConstant(clicked_id) {
  if (clicked_id == "PI" && mainScreen.innerHTML != "0") {
    mainScreen.innerHTML += Math.PI;
  } else if (clicked_id == "Euler" && mainScreen.innerHTML != "0") {
    mainScreen.innerHTML += Math.E;
  } else if (clicked_id == "PI" && mainScreen.innerHTML == "0") {
    mainScreen.innerHTML = Math.PI;
  } else {
    mainScreen.innerHTML = Math.E;
  }
}

function getDerivative() {
  mainScreen.innerHTML = eval(1 / mainScreen.innerHTML);
}
function getAbsoluteValue() {
  mainScreen.innerHTML = Math.abs(mainScreen.innerHTML);
}

function getModulo() {
  if (ValidateInput("%")) {
    mainScreen.innerHTML += "%";
  }
}

function getExponent() {
  let exp = Math.exp(mainScreen.innerHTML);
  if (isNaN(exp)) {
    mainScreen.innerHTML = mainScreen.innerHTML;
  } else {
    mainScreen.innerHTML = exp;
  }
}

function getFactorial() {
  let factorialNumber = mainScreen.innerHTML;
  if (factorialNumber < 0) {
    errorMessage.innerHTML =
      "<div class='alert alert-danger w-25' role='alert'>Invalid Input!!</div>";
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
  switch (clicked_id) {
    case "findSquare":
      mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 2);
      break;
    case "findXRoot":
      mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 1 / 2);
      break;
    case "findTenPower":
      mainScreen.innerHTML = Math.pow(10, mainScreen.innerHTML);
      break;
    case "findXCube":
      mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 3);
      break;
    case "findCubeRoot":
      mainScreen.innerHTML = Math.pow(mainScreen.innerHTML, 1 / 3);
      break;
    case "findTwoXSquare":
      mainScreen.innerHTML = Math.pow(2, mainScreen.innerHTML);
      break;
    case "findEulerXSquare":
      mainScreen.innerHTML = Math.pow(Math.E, mainScreen.innerHTML);
    case "findXYSqaure":
      if (ValidateInput("^")) {
        mainScreen.innerHTML += "^";
      }
      break;
  }
}

function getLog(clicked_id) {
  switch (clicked_id) {
    case "logTenBase":
      mainScreen.innerHTML = Math.log10(mainScreen.innerHTML);
      break;
    case "naturalLogarithm":
      mainScreen.innerHTML = Math.log(mainScreen.innerHTML);
      break;
  }
}

function setPlusMinus() {
  let firstOperator = mainScreen.innerHTML.charAt(0);
  if (firstOperator == "-") {
    getAbsoluteValue();
  } else {
    mainScreen.innerHTML =
      mainScreen.innerHTML.slice(0, 0) + "-" + mainScreen.innerHTML.slice(0);
  }
}

function ValidateInput(value) {
  let lastEntry = mainScreen.innerHTML.slice(-1);
  let operators = ["%", "+", "-", "*", "/", ".", "^", ".e+0"];
  if (operators.includes(value)) {
    if (operators.includes(lastEntry)) {
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function memoryStore() {
  const storedMemoryData = JSON.parse(localStorage.getItem("calcmemory"));
  if (mainScreen.innerHTML != "") {
    let memoryClear = document.getElementById("memory-clear");
    let memoryRecall = document.getElementById("memory-recall");
    if (storedMemoryData != null) {
      storedMemoryData.push(mainScreen.innerHTML);
      localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
      memoryClear.setAttribute("class", "btn");
      memoryRecall.setAttribute("class", "btn");
    } else {
      memoryItems.push(mainScreen.innerHTML);
      localStorage.setItem("calcmemory", JSON.stringify(memoryItems));
      memoryClear.setAttribute("class", "btn");
      memoryRecall.setAttribute("class", "btn");
    }
  }
}

function memoryPlusSubtract(clicked_id) {
  const storedMemoryData = JSON.parse(localStorage.getItem("calcmemory"));
  if (mainScreen.innerHTML != "") {
    if (storedMemoryData != null) {
      let lastItems = storedMemoryData.length - 1;
      switch (clicked_id) {
        case "memory-plus":
          let replacePlus = eval(
            storedMemoryData[lastItems] + "+" + mainScreen.innerHTML
          );
          storedMemoryData[lastItems] = replacePlus;
          localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
          break;
        case "memory-subtract":
          let replaceSubtract = eval(
            storedMemoryData[lastItems] + "-" + mainScreen.innerHTML
          );
          storedMemoryData[lastItems] = replaceSubtract;
          localStorage.setItem("calcmemory", JSON.stringify(storedMemoryData));
          break;
        default:
          localStorage.removeItem("calcmemory");
          checkMemory();
          break;
      }
    } else {
      return false;
    }
  }
}

function memoryRecall() {
  let retrievedMemoryData = localStorage.getItem("calcmemory");
  let memoryData = JSON.parse(retrievedMemoryData);
  mainScreen.innerHTML = memoryData[memoryData.length - 1];
}

function checkMemory() {
  const storedMemoryData = JSON.parse(localStorage.getItem("calcmemory"));
  let memoryClear = document.getElementById("memory-clear");
  let memoryRecall = document.getElementById("memory-recall");
  if (storedMemoryData == null) {
    memoryClear.className += " disabled";
    memoryRecall.className += " disabled";
  } else {
    memoryClear.setAttribute("class", "btn");
    memoryRecall.setAttribute("class", "btn");
  }
}

class MathFunction {
  static getRand() {
    mainScreen.innerHTML = Math.random();
  }
  static getFloor() {
    mainScreen.innerHTML = Math.floor(mainScreen.innerHTML);
  }
  static getCeil() {
    mainScreen.innerHTML = Math.ceil(mainScreen.innerHTML);
  }
}

class Trigonometry {
  static sin() {
    mainScreen.innerHTML = Math.sin(mainScreen.innerHTML);
  }
  static cos() {
    mainScreen.innerHTML = Math.cos(mainScreen.innerHTML);
  }
  static tan() {
    mainScreen.innerHTML = Math.tan(mainScreen.innerHTML);
  }
  static sinh() {
    mainScreen.innerHTML = Math.sinh(mainScreen.innerHTML);
  }
  static cosh() {
    mainScreen.innerHTML = Math.cosh(mainScreen.innerHTML);
  }
  static tanh() {
    mainScreen.innerHTML = Math.tanh(mainScreen.innerHTML);
  }
}
