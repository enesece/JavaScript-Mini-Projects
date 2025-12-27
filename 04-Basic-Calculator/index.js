const display = document.getElementById("display");
const keys = document.getElementById("keys");

keys.addEventListener("click", function (event) {
  const element = event.target;

  if (!element.matches("button")) return;

  const value = element.textContent;

  switch (value) {
    case `+`:
    case `-`:
    case `*`:
    case `/`:
    case `.`:
      appendToDisplay(value);
      break;

    case "=":
      calculate();
      break;

    case "C":
      clearDisplay();
      break;

    default:
      appendToDisplay(value);
  }
});

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
