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
    //logic to assign num1 or num2
    if (isOperatorSelected) {
      num2 = displayValue.textContent;
      result = operate(num1, num2, operator);
    } else {
      num1 = displayValue.textContent;
    }
  });
});

// selects operator
const operatorsButtons = document.querySelectorAll(".operations .op");
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

// clears display and reset variables value
const clearButton = document.querySelector(".numbers .clr");
clearButton.addEventListener("click", () => {
  displayValue.textContent = "";
  currentOperator.textContent = "";
  resetVariables();
});

// prints result to display
const computeButton = document.querySelector(".numbers .equals");
computeButton.addEventListener("click", () => {
  isEvaluated = true;
  if (isOperatorSelected) {
    displayValue.textContent = result;
    currentOperator.textContent = "";
  } else {
    displayValue.textContent = "Nothing to evaluate";
  }
});

function resetVariables() {
  isEvaluated = true;
  isOperatorSelected = false;
  operator = undefined;
  num1 = undefined;
  num2 = undefined;
  result = undefined;
}
