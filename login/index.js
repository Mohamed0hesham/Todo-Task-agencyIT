window.module = {};
import { setCookie } from "../utils/Cookies.js";
import { login, register } from "../utils/usersAPI.js";

const emailInput = document.getElementById("staticEmail");
const passwordInput = document.getElementById("inputPassword");
const loginForm = document.getElementById("form");

//login submition button listener
loginForm.addEventListener("submit", handleLogin);

function handleLogin(e) {
  e.preventDefault();
  const credentials = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  //calling the function containing the logic of logging in
  requestLogin(credentials);
}

const requestLogin = async (credentials) => {
  //sending the login data to the api
  //(the api only accepts emails that are already defined in the database)
  const response = await login(credentials);
  //the api returns only a token on a success login but i needed
  //the user id for getting the user data next so i called the registeration api
  //because it returns id and token
  //(all that because of the api limitaions, i know that this is not the way it works)
  if (response.token) {
    const regResponse = await register(credentials);
    setCookie("token", regResponse.token, 30);
    setCookie("id", regResponse.id, 30);
    window.location.replace(`../todo/index.html`);
  } else {
    alert(
      "The api won't accept emails other than the ones that are already exists in the database, please enter one of the provided emails in the readme file"
    );
  }
};
