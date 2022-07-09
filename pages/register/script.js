import { register } from "../../firebase/script.js";
import { loginScreen } from "../login/script.js";

export function modal() {
  const modal = document.querySelector(".modal");

  const registerInputs = modal
    .querySelector(".login-form")
    .querySelectorAll(".input");
  const [registerInputName, registerInputPassword, registerInputNickname] =
    registerInputs;
  const registerUser = {
    email: "",
    password: "",
    nickname: "",
  };

  const registerButton = document.querySelector("#register-button");
  const arrowRegisterButton = registerButton.querySelector("#img");
  let registerBackspaceInput = false;
  const closeButton = document.querySelector(".close-button");

  function checkInputLength(user) {
    return user.email.length > 0 &&
      user.nickname.length > 0 &&
      user.password.length >= 8
      ? true
      : false;
  }

  closeButton.addEventListener("click", () => {
    closeRegisterModal();
  });

  registerInputName.querySelector("input").addEventListener("focus", () => {
    registerInputName
      .querySelector(".placeholder")
      .classList.add("focusedInput");
    registerInputName
      .querySelector(".placeholder")
      .classList.remove("unfocusedInput");
  });

  registerInputName
    .querySelector("input")
    .addEventListener("focusout", (event) => {
      event.target.value.length === 0 &&
        (registerInputName
          .querySelector(".placeholder")
          .classList.add("unfocusedInput"),
        registerInputName
          .querySelector(".placeholder")
          .classList.remove("focusedInput"));
    });

  registerInputPassword.querySelector("input").addEventListener("focus", () => {
    registerInputPassword
      .querySelector(".placeholder")
      .classList.add("focusedInput");
    registerInputPassword
      .querySelector(".placeholder")
      .classList.remove("unfocusedInput");
  });

  registerInputPassword
    .querySelector("input")
    .addEventListener("focusout", (event) => {
      event.target.value.length === 0 &&
        (registerInputPassword
          .querySelector(".placeholder")
          .classList.add("unfocusedInput"),
        registerInputPassword
          .querySelector(".placeholder")
          .classList.remove("focusedInput"));
    });

  registerInputNickname.querySelector("input").addEventListener("focus", () => {
    registerInputNickname
      .querySelector(".placeholder")
      .classList.add("focusedInput");
    registerInputNickname
      .querySelector(".placeholder")
      .classList.remove("unfocusedInput");
  });

  registerInputNickname
    .querySelector("input")
    .addEventListener("focusout", (event) => {
      event.target.value.length === 0 &&
        (registerInputNickname
          .querySelector(".placeholder")
          .classList.add("unfocusedInput"),
        registerInputNickname
          .querySelector(".placeholder")
          .classList.remove("focusedInput"));
    });

  window.addEventListener("input", (event) => {
    let registerValue = event.target.value;
    switch (event.target.id) {
      case "register-name":
        registerUser.email = registerValue;
        break;
      case "register-password":
        registerUser.password = registerValue;
        break;
      case "register-nickname":
        registerUser.nickname = registerValue;
      default:
        break;
    }

    checkInputLength(registerUser)
      ? (registerButton.classList.add("validated"),
        arrowRegisterButton.classList.add("switchColorIn"),
        (registerBackspaceInput = true),
        registerButton.classList.remove("invalidated"),
        arrowRegisterButton.classList.remove("switchColorOut"))
      : registerBackspaceInput &&
        (arrowRegisterButton.classList.add("switchColorOut"),
        registerButton.classList.add("invalidated"),
        registerButton.classList.remove("validated"),
        arrowRegisterButton.classList.remove("switchColorIn"),
        (registerBackspaceInput = false));
  });

  registerButton.addEventListener("click", () =>
    register(registerUser, "email")
  );

  function closeRegisterModal() {
    document.querySelector(".modal").outerHTML = "";
    const login = document.querySelector(".login");
    login.style.pointerEvents = "inherit";
    loginScreen();
  }
}
