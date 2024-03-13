let num1;
let num2;
let operator;
let result;
let isOperatorSelected = false;
let isReset = false;
//let isFirstTime = true;

function add(a, b) {
  return +a + +b; //otherwise it adds strings
}

function sub(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operation) {
  if (operation === "+") return add(a, b);
  if (operation === "-") return sub(a, b);
  if (operation === "x") return multiply(a, b);
  if (operation === "/") return divide(a, b);
}

//assigns value to the two terms num1 and num2
const displayValue = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".numbers .digit");
digitButtons.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    //needed to clear display after "=" button being used
    if (isReset) {
      displayValue.textContent = "";
      isReset = false;
    }
    displayValue.textContent += digitBtn.textContent;
    if (isOperatorSelected) {
      num2 = displayValue.textContent;
      result = operate(num1, num2, operator);
    } else {
      num1 = displayValue.textContent;
    }
  });
});

// makes the operator selection
const operatorsButtons = document.querySelectorAll(".operations .op");
const currentOperator = document.querySelector(".current-operator");
operatorsButtons.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    currentOperator.textContent = operatorBtn.textContent;
    operator = operatorBtn.textContent.toLowerCase();
    if (isOperatorSelected) num1 = result;
    isOperatorSelected = true;
    displayValue.textContent = "";
  });
});

// enables clear button
const clearButton = document.querySelector(".numbers .clr");
clearButton.addEventListener("click", () => {
  displayValue.textContent = "";
  currentOperator.textContent = "";
  resetVariables();
});

// prints result to display and resets variables
const computeButton = document.querySelector(".numbers .equals");
computeButton.addEventListener("click", () => {
  if (isOperatorSelected) {
    displayValue.textContent = result;
    currentOperator.textContent = "";
  } else {
    displayValue.textContent = "Nothing to evaluate";
  }
});

function resetVariables() {
  isReset = true;
  isOperatorSelected = false;
  operator = undefined;
  num1 = undefined;
  num2 = undefined;
}
