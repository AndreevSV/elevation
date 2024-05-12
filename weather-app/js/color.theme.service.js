export function toggleMode() {
  const modeBtn = document.getElementById("colorModeButton");
  const modeString = document.getElementById("colorModeString");
  const mainBox = document.querySelector(".main-box");
  const a = document.querySelectorAll("a");

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (modeString.textContent === "Light mode") {
    mainBox.classList.add("invert-filter");
    modeString.textContent = "Dark mode";
    document.body.style.backgroundColor = "#4b4343";
    header.style.backgroundColor = "#3a3027";
    header.style.color = "white";
    mainBox.style.color = "white";
    footer.style.backgroundColor = "#3a3027";
    footer.style.color = "white";
    a.forEach((a) => (a.style.color = "white"));
  } else {
    mainBox.classList.remove("invert-filter");
    modeString.textContent = "Light mode";
    document.body.style.backgroundColor = "lightgrey";
    header.style.backgroundColor = "#a48463";
    header.style.color = "black";
    mainBox.style.color = "black";
    footer.style.backgroundColor = "#a48463";
    footer.style.color = "black";
    a.forEach((a) => (a.style.color = "blue"));
  }
}
