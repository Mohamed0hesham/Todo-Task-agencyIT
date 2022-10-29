window.module = {};
import { setCookie } from "../utils/Cookies.js";
import { register } from "../utils/usersAPI.js";

const registerForm = document.getElementById("form");
const emailInput = document.getElementById("staticEmail");
const passwordInput = document.getElementById("inputPassword");
const confirmPasswordnInput = document.getElementById("inputConfirmPassword");

//registeration submition button listener
registerForm.addEventListener("submit", handleRegister);

const validateInput = () => {
  //validating the password to be matching the confirmation password
  if (passwordInput.value !== confirmPasswordnInput.value) {
    alert("The confirm password does not match the password");
    return false;
  }
  return true;
};

function handleRegister(event) {
  event.preventDefault();

  if (validateInput()) {
    const credentials = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    //calling the function containing the logic of registering
    postData(credentials);
  }
}

const postData = async (credentials) => {
  //sending the registeration data to the api
  //(the api only accepts emails that are already defined in the database)
  const response = await register(credentials);
  //if the response contains id then it's success, if not that means that the
  //provided email is not one of the defined emails
  if (response.id) {
    //adding the id and token to the cookies
    setCookie("id", response.id, 30);
    setCookie("token", response.token, 30);
    window.location.replace("../todo/index.html");
  } else {
    alert(
      "The api won't accept emails other than the ones that are already exists in the database, please enter one of the provided emails in the readme file"
    );
  }
};
