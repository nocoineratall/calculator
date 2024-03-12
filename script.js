let num1;
let num2;
let operator;

function add(a, b) {
  return a + b;
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
  if (operation === "*") return multiply(a, b);
  if (operation === "/") return divide(a, b);
}

//prints the digit button pressed in the calculator display
const displayValue = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".numbers .digit");
digitButtons.forEach((digit) => {
  digit.addEventListener("click", () => {
    displayValue.textContent = digit.textContent;
    num1 = digit.textContent;
  });
});
