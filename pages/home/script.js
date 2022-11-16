function home() {}

export async function renderHome() {
  document.querySelector("main").outerHTML = "";
  await fetch("../home/index.html")
    .then((res) => res.text())
    .then((text) => {
      document.querySelector("body").innerHTML += text;
      home();
    });
}
