import { register } from "../../firebase/script.js";
import { loginScreen } from "../login/script.js";
import { api } from "../../api-lol/api.js";

export function modal() {
  const modal = document.querySelector(".modal");

  const registerInputs = modal
    .querySelector(".login-form")
    .querySelectorAll(".input");
  const [registerInputName, registerInputPassword, registerInputNickname] =
    registerInputs;
  const registerUser = {
    email: "rianfiore@gmail.com",
    password: "",
    nickname: "",
  };

  const registerButton = document.querySelector("#register-button");
  const arrowRegisterButton = registerButton.querySelector("#img");
  let registerBackspaceInput = false;
  const closeButton = document.querySelector(".close-button");
  const checkboxNickname = document.querySelector(".disable-nickname");

  function toggleInput(id) {
    const input = document.querySelector(id);
    const placeholder = document.querySelector("#nickname");

    checkboxNickname.checked
      ? (placeholder.classList.add("enabled"),
        input.classList.add("enabled"),
        placeholder.classList.remove("disabled"),
        input.classList.remove("disabled"))
      : ((input.value = ""),
        input.classList.add("disabled"),
        placeholder.classList.add("disabled"),
        input.classList.remove("enabled"),
        placeholder.classList.remove("enabled"));
  }

  function checkInputLength(user) {
    return user.email.length > 0 &&
      (checkboxNickname.checked
        ? user.nickname.length > 0
        : user.nickname.length === 0) &&
      user.password.length >= 8
      ? true
      : false;
  }

  checkboxNickname.addEventListener("change", () => {
    toggleInput("#register-nickname");
  });

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

  registerInputNickname
    .querySelector("#register-nickname")
    .addEventListener("focus", () => {
      registerInputNickname
        .querySelector(".placeholder")
        .classList.add("focusedInput");
      registerInputNickname
        .querySelector(".placeholder")
        .classList.remove("unfocusedInput");
    });

  registerInputNickname
    .querySelector("#register-nickname")
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

  registerButton.addEventListener("click", () => {
    checkInputLength(registerUser)
      ? checkboxNickname.checked
        ? verifyNickname(registerUser)
        : register(registerUser, "email")
      : console.log("Erro: preencha os campos obrigatórios");
  });

  async function verifyNickname(registerUser) {
    (await api("summoner", registerUser)) && register(registerUser, "email");
  }

  function closeRegisterModal() {
    document.querySelector(".modal").outerHTML = "";
    const login = document.querySelector(".login");
    login.style.pointerEvents = "inherit";
    loginScreen();
  }
}
