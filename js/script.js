const themeInput = document.querySelector("#custom-toggle");
const numbers = document.querySelectorAll(
  ".numberpad>button:not(.del, .reset, .equal, .operators)"
);
const numberPad = document.querySelector(".numberpad");

console.log(numberPad);
// const operators = document.querySelectorAll(".operators");
const delBtn = document.querySelector(".del");
const display = document.querySelector(".result");
const equalBtn = document.querySelector(".equal");
const operatorSigns = new Set(["+", "-", "x", "/"]);
let expr = "";
let previousKeyType = "";
let firstValue = "";
let operator = "";
// console.log(delBtn);
// - Perform mathematical operations like addition, subtraction, multiplication, and division

const operators = { add: "+", subtract: "-", multiply: "*", divide: "/" };
function numberWithCommas(x) {
  x = x.replace(/,/g, "");
  return parseFloat(x).toLocaleString();
}

function detectColorScheme() {
  let theme = "dark-theme";

  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    theme = "light-theme";
  }

  switch (theme) {
    case "dark-theme":
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.remove("purple-theme");
      break;
    case "light-theme":
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("purple-theme");
      break;
    case "purple-theme":
      document.documentElement.classList.add("purple-theme");
      document.documentElement.classList.remove("light-theme");
      break;

    default:
      break;
  }

  themeInput.value = localStorage.getItem("toggle-val");
}

function changeTheme(e) {
  const currentVal = parseInt(e.currentTarget.value);

  localStorage.setItem("toggle-val", currentVal);
  switch (currentVal) {
    case 1:
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.remove("purple-theme");
      localStorage.setItem("theme", "dark-theme");
      break;
    case 2:
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("purple-theme");
      localStorage.setItem("theme", "light-theme");
      break;
    case 3:
      document.documentElement.classList.add("purple-theme");
      document.documentElement.classList.remove("light-theme");
      localStorage.setItem("theme", "purple-theme");
      break;

    default:
      break;
  }
}
function updateNumber(e) {
  if (result.textContent == 0 || previousKeyType === "operator") {
    result.textContent = e.currentTarget.textContent;
    previousKeyType = "";
  } else {
    result.textContent += e.currentTarget.textContent;
  }
  expr = result.textContent;
  previousKeyType = "number";

  // let separators = ["\\+", "-", "\\*", "/"];

  // let numbers = result.textContent.split(new RegExp(separators.join("|"), "g"));
  // const signs = [...operatorSigns].filter(
  //   (e) => result.textContent.indexOf(e) != -1
  // );
  // result.textContent = "";

  // for (const [idx, number] of numbers.entries()) {
  //   // console.log(number, idx);
  //   if (idx % 2 !== 0) {
  //     console.log(signs);
  //     result.textContent += signs.pop();
  //   }
  //   result.textContent += numberWithCommas(number);
  // }
}
function chooseOperators(e) {
  // console.log(e.currentTarget.value);
  // result.textContent += e.currentTarget.value;

  switch (e.currentTarget.value) {
    case ".":
      dotOperator(e.currentTarget.value);
      previousKeyType = "decimal";
      break;

    case "+":
      previousKeyType = "operator";
      firstValue = result.textContent;
      operator = e.currentTarget.value;
      break;
    case "-":
      previousKeyType = "operator";
      firstValue = result.textContent;
      operator = e.currentTarget.value;
      break;
    case "*":
      previousKeyType = "operator";
      firstValue = result.textContent;
      operator = e.currentTarget.value;
      break;
    case "/":
      previousKeyType = "operator";
      firstValue = result.textContent;
      operator = e.currentTarget.value;
      break;
    default:
      break;
  }
  expr = result.textContent;
  // operator = e.currentTarget.value;
}
// console.log(math.evaluate("2x4"));
function dotOperator(dot) {
  console.log(previousKeyType);
  if (!result.textContent.includes(".")) {
    result.textContent += dot;
  } else if (previousKeyType == "operator") {
    result.textContent = "0.";
  }
}
function plusOperator(plus) {}
function minusOperator(minus) {}
function timesOperator(times) {}
function divideOperator(divide) {}

detectColorScheme();

themeInput.addEventListener("click", changeTheme);

numberPad.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    const previousKeyType = numberPad.dataset.previousKeyType;
    if (!action) {
      console.log("number-key");
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator key");
      numberPad.dataset.previousKeyType = "operator";

      numberPad.dataset.firstValue = displayedNum;
      numberPad.dataset.operator = action;
    }

    if (action === "decimal") {
      console.log("decimal key");
      display.textContent = displayedNum + ".";
    }
    if (action === "clear") {
      console.log("clear key");
    }
    if (action === "calculate") {
      console.log("equal key");
      const firstValue = numberPad.dataset.firstValue;
      const operator = numberPad.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = math.evaluate(
        `${firstValue}${operators[operator]}${secondValue}`
      );
    }
    if (action === "delete") {
      console.log("delete key");
    }
  }
});

// for (const number of numbers) {
//   number.addEventListener("click", updateNumber);
// }
// for (const operator of operators) {
//   operator.addEventListener("click", chooseOperators);
// }
// delBtn.addEventListener("click", () => {
//   result.textContent = "0";
//   previousKeyType = "delete";
// });

// equalBtn.addEventListener("click", () => {
//   result.textContent = math.evaluate(
//     `${firstValue}${operator}${result.textContent}`
//   );
// });
