window.module = {};
import { getCookie } from "../utils/Cookies.js";

const token = getCookie("token");

//if a token is found in the cookies then it will redirect to the todo directly
if (token) {
  window.location.replace("./todo/index.html");
}

const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");

loginBtn.addEventListener("click", () => {
  //redirecting to the login page
  window.location.assign("./login/index.html");
});

registerBtn.addEventListener("click", () => {
  //redirecting to the register page
  window.location.assign("./register/index.html");
});
