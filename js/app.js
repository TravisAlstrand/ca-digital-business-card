const logo = document.querySelector("#logo");
const container = document.querySelector("#container");
const turnBtn = document.querySelector("#turnBtn");
const turnSVG = document.querySelector("#turnBtnSVG");
const nameSocials = document.querySelector("#nameSocials");
const socials = document.querySelector("#socials");

window.addEventListener("load", () => {
  addSpinAnim(logo);
});

turnBtn.addEventListener("click", () => {
  socials.classList.toggle("flex");
  socials.classList.toggle("no-display");
  nameSocials.classList.toggle("justify-center");
  container.firstElementChild.classList.toggle("flip");
  addSpinAnim(turnSVG);
  console.log("turn card over");
});

function addSpinAnim(el) {
  el.style.animation = "spin 1s ease-in-out";
  setTimeout(() => {
    el.style.animation = null;
  }, 1100);
}
