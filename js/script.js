const themeInput = document.querySelector("#custom-toggle");
const numbers = document.querySelectorAll(
  ".numberpad>button:not(.del, .reset, .equal, .operators)"
);
const numberPad = document.querySelector(".numberpad");

// console.log(numberPad);
// const operators = document.querySelectorAll(".operators");
const delBtn = document.querySelector(".del");
const display = document.querySelector(".result");
const equalBtn = document.querySelector(".equal");

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

detectColorScheme();

themeInput.addEventListener("click", changeTheme);

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};
numberPad.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    const previousKeyType = numberPad.dataset.previousKeyType;
    if (!action) {
      // console.log("number-key");
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }

      numberPad.dataset.previousKeyType = "number";
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = numberPad.dataset.firstValue;
      const operator = numberPad.dataset.operator;
      const secondValue = displayedNum;
      // console.log("operator key");

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        // console.log(firstValue, operator, secondValue);
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        numberPad.dataset.firstValue = calcValue;
      } else {
        numberPad.dataset.firstValue = displayedNum;
      }
      // 8 - 1 = 7, 7 - 2 = 5, 5 - 3 = 2
      numberPad.dataset.previousKeyType = "operator";
      // numberPad.dataset.firstValue = display.textContent;
      numberPad.dataset.operator = action;
    }

    if (action === "decimal") {
      console.log("decimal key");
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      numberPad.dataset.previousKeyType = "decimal";
    }
    if (action === "clear") {
      console.log("clear key");
      display.textContent = 0;
      numberPad.dataset.firstValue = "";
      numberPad.dataset.modValue = "";
      numberPad.dataset.operator = "";
      numberPad.dataset.previousKeyType = "";
      numberPad.dataset.previousKeyType = "clear";
    }
    if (action === "calculate") {
      console.log("equal key");
      const firstValue = numberPad.dataset.firstValue;
      const operator = numberPad.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType == "calculatte") {
          firstValue = displayedNum;
          secondValue = numberPad.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      numberPad.dataset.modValue = secondValue;
      numberPad.dataset.previousKeyType = "calculate";
    }
    if (action === "delete") {
      console.log("delete key");
      display.textContent = display.textContent.slice(0, -1);
      if (display.textContent == "") {
        display.textContent = 0;
      }
      numberPad.dataset.previousKeyType = "delete";
    }
  }
});
