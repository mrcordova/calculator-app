const themeInput = document.querySelector("#custom-toggle");

// - **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and
// have any additional changes saved in the browser
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
