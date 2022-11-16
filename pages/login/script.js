import { modal } from "../register/script.js";
import { login } from "../../firebase/script.js";

window.addEventListener("load", () => loginScreen());

export function loginScreen() {
  const inputs = document
    .querySelector(".form-content")
    .querySelectorAll(".input");
  const [inputName, inputPassword] = inputs;
  const user = {
    email: "",
    password: "",
    keep_login: false,
  };
  const loginButton = document.querySelector(".register-button");
  const loginForm = document.querySelector(".login-form");
  const arrowLoginButton = loginButton.querySelector("img");
  const registerAccount = document.querySelector(".create-account");
  let backspaceInput = false;

  function checkInputLength(user) {
    return user.email.length > 0 && user.password.length >= 8 ? true : false;
  }

  loginForm.addEventListener("submit", () => loginWithEmail());

  registerAccount.addEventListener("click", () => {
    openRegisterModal();
  });

  inputName.querySelector("input").addEventListener("focus", () => {
    inputName.querySelector(".placeholder").classList.add("focusedInput");
    inputName.querySelector(".placeholder").classList.remove("unfocusedInput");
  });

  inputName.querySelector("input").addEventListener("focusout", (event) => {
    event.target.value.length === 0 &&
      (inputName.querySelector(".placeholder").classList.add("unfocusedInput"),
      inputName.querySelector(".placeholder").classList.remove("focusedInput"));
  });

  inputPassword.querySelector("input").addEventListener("focus", () => {
    inputPassword.querySelector(".placeholder").classList.add("focusedInput");
    inputPassword
      .querySelector(".placeholder")
      .classList.remove("unfocusedInput");
  });

  inputPassword.querySelector("input").addEventListener("focusout", (event) => {
    event.target.value.length === 0 &&
      (inputPassword
        .querySelector(".placeholder")
        .classList.add("unfocusedInput"),
      inputPassword
        .querySelector(".placeholder")
        .classList.remove("focusedInput"));
  });

  window.addEventListener("input", (event) => {
    let value = event.target.value;

    switch (event.target.id) {
      case "name":
        user.email = value;
        break;
      case "password":
        user.password = value;
        break;
      case "keep-login":
        user.keep_login = !user.keep_login;
      default:
        break;
    }

    checkInputLength(user)
      ? (loginButton.classList.add("validated"),
        arrowLoginButton.classList.add("switchColorIn"),
        (backspaceInput = true),
        loginButton.classList.remove("invalidated"),
        arrowLoginButton.classList.remove("switchColorOut"))
      : backspaceInput &&
        (arrowLoginButton.classList.add("switchColorOut"),
        loginButton.classList.add("invalidated"),
        loginButton.classList.remove("validated"),
        arrowLoginButton.classList.remove("switchColorIn"),
        (backspaceInput = false));
  });

  function loginWithEmail() {
    console.log(user);
    login(user, "email");
  }

  function openRegisterModal() {
    fetch("../register/index.html")
      .then((res) => res.text())
      .then((text) => {
        document.querySelector("main").innerHTML += text;
        modal();
      });

    const login = document.querySelector(".login");

    login.style.pointerEvents = "none";
  }
}
