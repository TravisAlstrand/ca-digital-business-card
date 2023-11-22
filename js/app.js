// Header Elements
const logo = document.querySelector("#logo");
const frontNameCont = document.querySelector("#frontNameSocials");
const backNameCont = document.querySelector("#backNameSocials");

window.addEventListener("load", () => {
  addSpinAnim(logo, "right");
});

// Card Elements
const container = document.querySelector("#container");
const cardFront = container.querySelector("#cardFront");
const cardBack = container.querySelector("#cardBack");
const turnBtn = document.querySelector("#turnBtn");
const turnSVG = document.querySelector("#turnBtnSVG");

// Which side is visible?
let isFrontVisible = true;

// Flip the card
turnBtn.addEventListener("click", () => {
  if (isFrontVisible) {
    fadeInOutHeader(frontNameCont, backNameCont);
    setTimeout(() => {
      addSpinAnim(logo, "right");
    }, 500);
  } else {
    fadeInOutHeader(backNameCont, frontNameCont);
    setTimeout(() => {
      addSpinAnim(logo, "left");
    }, 500);
  }
  switchAriaHiddens();
  toggleClass(container.firstElementChild, "flip");
  addSpinAnim(turnSVG);
});

function switchAriaHiddens() {
  isFrontVisible = cardFront.getAttribute("aria-hidden") === "true";

  cardFront.setAttribute("aria-hidden", !isFrontVisible);
  frontNameCont.setAttribute("aria-hidden", !isFrontVisible);
  cardBack.setAttribute("aria-hidden", isFrontVisible);
  backNameCont.setAttribute("aria-hidden", !isFrontVisible);
}

function toggleClass(el, cssClass) {
  el.classList.toggle(cssClass);
}

function fadeInOutHeader(fromEl, toEl) {
  fromEl.style.animation = "fadeOut .5s ease-in-out";
  setTimeout(() => {
    fromEl.style.opacity = 0;
    fromEl.style.animation = null;
    toggleClass(fromEl, "no-display");
    toggleClass(toEl, "no-display");
    toEl.style.animation = "fadeIn .5s ease-in-out";
    setTimeout(() => {
      toEl.style.animation = null;
      toEl.style.opacity = 1;
    }, 500);
  }, 500);
}

function addSpinAnim(el, direction) {
  if (direction === "right") {
    el.style.animation = "spinRight 1s ease-in-out";
    setTimeout(() => {
      el.style.animation = null;
    }, 1100);
  } else {
    el.style.animation = "spinLeft 1s ease-in-out";
    setTimeout(() => {
      el.style.animation = null;
    }, 1100);
  }
}
