// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
import { api } from "../../api-lol/api.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9H7aO3zdA-vbR3ZOSOX_ETZR941JHChQ",
  authDomain: "league-of-legends-90b0f.firebaseapp.com",
  projectId: "league-of-legends-90b0f",
  storageBucket: "league-of-legends-90b0f.appspot.com",
  messagingSenderId: "65590900621",
  appId: "1:65590900621:web:01644778e693d68ca6afc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

export function login(payload, type) {
  switch (type) {
    case "email":
      loginUserWithEmail(payload);
      break;
    default:
      break;
  }

  function loginUserWithEmail(payload) {
    const email = payload.email;
    const password = payload.password;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const data = {};
        const user = userCredential.user;
        const dbRef = ref(database);
        get(child(dbRef, `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              api("summoner", snapshot.val());
            } else {
              console.log("no data avaliable");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        alert(`Você foi logado com sucesso!`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(`Dados incorretos. Por favor, insira os dados corretamente!`);
      });
  }
}

export function register(payload, type) {
  switch (type) {
    case "email":
      createUserWithEmail(payload);
      break;
    default:
      break;
  }

  function createUserWithEmail(payload) {
    const email = payload.email;
    const password = payload.password;
    const nickname = payload.nickname;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Signed in
        const user = userCredential.user;

        set(ref(database, "users/" + user.uid), {
          email: email,
          password: password,
          nickname: nickname,
          uid: user.uid,
        });

        alert.log("Usuário criado com sucesso!");
        //..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}
