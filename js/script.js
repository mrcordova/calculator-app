const themeInput = document.querySelector("#custom-toggle");
const numbers = document.querySelectorAll(
  ".numberpad>div:not(.del, .reset, .equal, .operators)"
);

const delBtn = document.querySelector(".del");
const result = document.querySelector(".result");

// console.log(delBtn);
// - Perform mathematical operations like addition, subtraction, multiplication, and division
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
  result.textContent += e.currentTarget.textContent;

  result.textContent = numberWithCommas(result.textContent);
}
detectColorScheme();
themeInput.addEventListener("click", changeTheme);
for (const number of numbers) {
  number.addEventListener("click", updateNumber);
}

delBtn.addEventListener("click", () => {
  console.log("click");
  result.textContent = "0";
});
