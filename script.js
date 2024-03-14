// Initialize global variables
let num1;
let num2;
let operator;
let result;
let isOperatorSelected = false;
let isEvaluated = false;

function operate(a, b, operation) {
  if (operation === "+") return +a + +b;
  if (operation === "-") return a - b;
  if (operation === "x") return a * b;
  if (operation === "/") return a / b;
}

//assigns value to the two terms num1 and num2
const displayValue = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".numbers .digit");
digitButtons.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    //clears display after "=" button being used
    if (isEvaluated) {
      displayValue.textContent = "";
      isEvaluated = false;
    }
    displayValue.textContent += digitBtn.textContent;

    assignTerms();
  });
});

// manages floating point button for itself
const floatingPoint = document.querySelector(".numbers .point");
floatingPoint.addEventListener("click", () => {
  // so the point is selected only once
  if (!displayValue.textContent.includes("."))
    displayValue.textContent += floatingPoint.textContent;
});

// selects operator
const operatorsButtons = document.querySelectorAll(".operators .op");
const currentOperator = document.querySelector(".current-operator");
operatorsButtons.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    //prevents operators to be selected before numbers
    if (num1 == undefined) {
      displayValue.textContent = "Nothing to evaluate";
    } else {
      currentOperator.textContent = operatorBtn.textContent;
      operator = operatorBtn.textContent.toLowerCase();
      //allows multiple operations to be chained together
      if (isOperatorSelected) num1 = result;
      isOperatorSelected = true;
      displayValue.textContent = "";
    }
  });
});

// backspace
const backspaceBtn = document.querySelector(".operators .backspace");
backspaceBtn.addEventListener("click", () => {
  let displayContent = displayValue.textContent;
  displayValue.textContent = displayContent.slice(0, displayContent.length - 1);
  assignTerms();
});

// clears display and reset variables value
const clearButton = document.querySelector(".numbers .clr");
clearButton.addEventListener("click", () => {
  resetVariables();
  displayValue.textContent = "";
});

// prints result to display
const computeButton = document.querySelector(".functions .equals");
computeButton.addEventListener("click", () => {
  printResult();
  let tempResult = result;
  resetVariables();
  num1 = tempResult;
});

function resetVariables() {
  isEvaluated = true;
  isOperatorSelected = false;
  operator = undefined;
  num1 = undefined;
  num2 = undefined;
  result = undefined;
  currentOperator.textContent = "";
}

//logic to assign num1 or num2
function assignTerms() {
  if (isOperatorSelected) {
    num2 = displayValue.textContent;
    if (num2 == 0) {
      displayValue.textContent = "Can't divide by zero - Reset calculator";
    } else {
      result = operate(num1, num2, operator);
    }
  } else {
    num1 = displayValue.textContent;
  }
}

function printResult() {
  isEvaluated = true;
  if (isOperatorSelected) {
    displayValue.textContent = result;
    currentOperator.textContent = "";
  } else {
    displayValue.textContent = "Nothing to evaluate";
  }
}

// Adds keyboard functionality
document.addEventListener("keydown", function (event) {
  console.log(event.key);
  if (
    event.key == 0 ||
    event.key == 1 ||
    event.key == 2 ||
    event.key == 3 ||
    event.key == 4 ||
    event.key == 5 ||
    event.key == 6 ||
    event.key == 7 ||
    event.key == 8 ||
    event.key == 9
  ) {
    displayValue.textContent += event.key;
    assignTerms();
  }
  if (event.key == ".") {
    if (!displayValue.textContent.includes("."))
      displayValue.textContent += ".";
  }
  if (
    event.key == "+" ||
    event.key == "-" ||
    event.key == "*" ||
    event.key == "/"
  ) {
    // had to copy the same logic for when operator is selected but using event.key
    if (num1 == undefined) {
      displayValue.textContent = "Nothing to evaluate";
    } else {
      currentOperator.textContent = event.key;
      operator = event.key;
      //allows multiple operations to be chained together
      if (isOperatorSelected) num1 = result;
      isOperatorSelected = true;
      displayValue.textContent = "";
    }
  }
  if (event.key == "Delete") {
    resetVariables();
    displayValue.textContent = "";
  }
  if (event.key == "Enter") {
    printResult();
    let tempResult = result;
    resetVariables();
    num1 = tempResult;
  }
});
