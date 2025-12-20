const loginScreen = document.getElementById("loginScreen");
const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");

const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeHeader = document.getElementById("welcomeHeader");
const logoutBtn = document.getElementById("logoutBtn");

const savedName = localStorage.getItem("username");

if (savedName) {
  loginScreen.style.display = "none";
  welcomeScreen.style.display = "block";

  welcomeHeader.innerText = "Welcome, " + savedName;
}

loginBtn.addEventListener("click", function () {
  const inputValue = usernameInput.value.trim();

  if (inputValue !== "") {
    localStorage.setItem("username", inputValue);
    location.reload();
  } else {
    alert("Please enter your name!");
  }
});

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("username");
  location.reload();
});
