const themeInput = document.querySelector("#custom-toggle");

function changeTheme(e) {
  const currentVal = parseInt(e.currentTarget.value);

  switch (currentVal) {
    case 1:
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.remove("purple-theme");
      console.log(currentVal);
      break;
    case 2:
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("purple-theme");
      break;
    case 3:
      document.documentElement.classList.add("purple-theme");
      document.documentElement.classList.remove("light-theme");
      break;

    default:
      break;
  }
}

themeInput.addEventListener("click", changeTheme);
