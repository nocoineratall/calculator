let num1;
let num2;
let operator;
let isOperatorSelected = false;
let isFirstTime = true;

function add(a, b) {
  return +a + +b; //otherwise is adds strings
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

//prints the digit button pressed in the calculator display
const displayValue = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".numbers .digit");
digitButtons.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (!isOperatorSelected) {
      displayValue.textContent += digit.textContent;
      num1 = displayValue.textContent;
    } else {
      if (isFirstTime) displayValue.textContent = "";
      isFirstTime = false;
      displayValue.textContent += digit.textContent;
      num2 = displayValue.textContent;
    }
  });
});

// makes the operator selection
const operatorsButtons = document.querySelectorAll(".operations .op");
operatorsButtons.forEach((operation) => {
  operation.addEventListener("click", () => {
    operator = operation.textContent.toLowerCase();
    isOperatorSelected = true;
  });
});

// enables clear button
const clearButton = document.querySelector(".numbers .clr");
clearButton.addEventListener("click", () => {
  displayValue.textContent = "";
  isOperatorSelected = false;
  isFirstTime = true;
  operator = undefined;
  num1 = undefined;
  num2 = undefined;
});

// enables equals button
const computeButton = document.querySelector(".numbers .equals");
computeButton.addEventListener("click", () => {
  if (isOperatorSelected) {
    let result = operate(num1, num2, operator);
    displayValue.textContent = result;
    num1 = result;
    operator = undefined;
    isOperatorSelected = false;
    isFirstTime = true;
  } else {
    displayValue.textContent = "Select a number or operator first";
  }
});
