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
  switch (operation) {
    case "+":
      add(a, b);
      break;
    case "-":
      sub(a, b);
      break;
    case "*":
      multiply(a, b);
      break;
    case "/":
      divide(a, b);
  }
}
