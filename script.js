/* PSEUDOCODE
- user can input a number which is taken as first argument of calculation
- user selects an operator, which is displayed
- user selects another number which is taken as second argument of calculation
    * if another operator is selected the result of the previous operation is displayed
      which becomes the first argument of the next calculation and the cycle repeats
    * if "=" is pressed the result is displayed and the variables are reset back to default
- user can use "C" to reset to default
- user can use backspace to remove a digit from the currently displayed number
- floating point calculations are allowed 
*/

// Initialize global variables
let num1;
let num2;
let operator;
let result;
let isOperatorSelected = false;
let isEvaluated = false;
let digitsToDisplay = 9;

// stores buttons from DOM
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".numbers .number");
const floatingPoint = document.querySelector(".numbers .point");
const operatorsButtons = document.querySelectorAll(".op");
const currentOperator = document.querySelector(".current-operator");
const backspaceBtn = document.querySelector("#backspace");
const clearButton = document.querySelector(".numbers .clr");
const computeButton = document.querySelector(".equals");

function operate(a, b, operator) {
  if (b != 0 && b != undefined) {
    if (operator === "+") return roundToNumOfDigit(+a + +b, digitsToDisplay);
    if (operator === "-") return roundToNumOfDigit(a - b, digitsToDisplay);
    if (operator === "x") return roundToNumOfDigit(a * b, digitsToDisplay);
    if (operator === "/") return roundToNumOfDigit(a / b, digitsToDisplay);
  } else {
    display.textContent = "Error";
  }
}

function resetVariables() {
  isEvaluated = false;
  isOperatorSelected = false;
  operator = undefined;
  num1 = undefined;
  num2 = undefined;
  result = undefined;
  currentOperator.textContent = "";
}

function assignTerms() {
  if (isOperatorSelected) {
    num2 = display.textContent;
  } else {
    num1 = display.textContent;
  }
}

function eraseLastDigit() {
  let displayContent = display.textContent;
  display.textContent = displayContent.slice(0, displayContent.length - 1);
  assignTerms();
}

function printResult() {
  isEvaluated = true;
  if (isOperatorSelected) {
    display.textContent = result;
    currentOperator.textContent = "";
  }
}

function roundToNumOfDigit(num, digits) {
  let number = [];
  num
    .toString()
    .split("")
    .forEach((char) => {
      if (digits === 1) {
        if (char === ".") {
          number.push(char);
        } else {
          number.push((parseInt(char) + 1).toString());
          digits -= 1;
        }
      } else if (digits > 0) {
        if (char === ".") {
          number.push(char);
        } else {
          number.push(char);
          digits -= 1;
        }
      }
    });
  return +number.join("");
}

/* ------------------------------- EVENTS ------------------------------- */

//assigns value to the two terms num1 and num2
numberButtons.forEach((numBtn) => {
  numBtn.addEventListener("click", () => {
    //clears display after "=" button being used
    if (isEvaluated) {
      display.textContent = "";
      isEvaluated = false;
    }
    display.textContent += numBtn.textContent;
    assignTerms();
  });
});

// manages floating point button for itself
floatingPoint.addEventListener("click", () => {
  // so the point is selected only once
  if (!display.textContent.includes("."))
    display.textContent += floatingPoint.textContent;
});

// selects operator and computes result
operatorsButtons.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    //prevents operators to be selected before numbers
    if (num1 == undefined) {
      printResult();
    } else {
      currentOperator.textContent = operatorBtn.textContent;
      //allows multiple operations to be chained together
      result = operate(num1, num2, operator);
      isEvaluated = true;
      operator = operatorBtn.textContent.toLowerCase();
      if (num2 == undefined) {
        display.textContent = num1;
      } else {
        display.textContent = result;
      }
      if (isOperatorSelected) num1 = result;
      isOperatorSelected = true;
    }
  });
});

// backspace
backspaceBtn.addEventListener("click", () => {
  eraseLastDigit();
});

// clears display and reset variables value
clearButton.addEventListener("click", () => {
  resetVariables();
  display.textContent = "";
});

// prints result to display
computeButton.addEventListener("click", () => {
  result = operate(num1, num2, operator);
  printResult();
  let tempResult = result;
  resetVariables();
  num1 = tempResult;
});

/* ------------------------------- KEYBOARD ------------------------------- */

document.addEventListener("keydown", (event) => {
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
    if (isEvaluated) {
      display.textContent = "";
      isEvaluated = false;
    }
    display.textContent += event.key;
    assignTerms();
  }
  if (event.key == ".") {
    if (!display.textContent.includes(".")) display.textContent += ".";
  }
  if (
    event.key == "+" ||
    event.key == "-" ||
    event.key == "*" ||
    event.key == "/"
  ) {
    // had to copy the same logic for when operator is selected but using event.key
    //prevents operators to be selected before numbers
    if (num1 == undefined) {
      display.textContent = "Select a number first";
    } else {
      currentOperator.textContent = event.key;
      //allows multiple operations to be chained together
      result = operate(num1, num2, operator);
      isEvaluated = true;
      operator = event.key;
      if (operator == "*") {
        operator = "x";
        currentOperator.textContent = "X";
      }
      if (num2 == undefined) {
        display.textContent = num1;
      } else {
        display.textContent = result;
      }
      if (isOperatorSelected) num1 = result;
      isOperatorSelected = true;
    }
  }
  if (event.key == "Delete") {
    resetVariables();
    display.textContent = "";
  }
  if (event.key == "Backspace") {
    eraseLastDigit();
  }
  if (event.key == "Enter") {
    result = operate(num1, num2, operator);
    printResult();
    let tempResult = result;
    resetVariables();
    num1 = tempResult;
  }
});
