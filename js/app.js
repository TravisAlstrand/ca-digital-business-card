// Header Elements
const profileImg = document.querySelector("#profileImg");
const logo = document.querySelector("#logo");
const frontNameCont = document.querySelector("#frontNameSocials");
const backNameCont = document.querySelector("#backNameSocials");

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
  const windowWidth = window.innerWidth;

  if (isFrontVisible) {
    fadeInOutHeader(frontNameCont, backNameCont);
    if (windowWidth > 1023) {
      setTimeout(() => {
        addMoveAnim(profileImg, "Right");
        addMoveAnim(logo, "Right");
      }, 500);
    } else {
      setTimeout(() => {
        addSpinAnim(logo, "Right");
      }, 500);
    }
  } else {
    fadeInOutHeader(backNameCont, frontNameCont);
    if (windowWidth > 1023) {
      setTimeout(() => {
        addMoveAnim(profileImg, "Left");
        addMoveAnim(logo, "Left");
      }, 500);
    } else {
      setTimeout(() => {
        addSpinAnim(logo, "Left");
      }, 500);
    }
  }
  switchAriaHiddens();
  toggleClass(container.firstElementChild, "flip");
  addSpinAnim(turnSVG, "Right");
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
  el.style.animation = `spin${direction} 1s ease-in-out`;
  setTimeout(() => {
    el.style.animation = null;
  }, 1000);
}

function addMoveAnim(el, direction) {
  let elID;
  el.id === "logo" ? (elID = "Logo") : (elID = "Img");
  el.style.animation = `move${elID}To${direction} 1s ease-in-out`;
  console.log(el);
  console.log(el.style.animation);

  setTimeout(() => {
    el.style.animation = null;
    if (elID === "Logo") {
      direction === "Right"
        ? (el.style.left = "390px")
        : (el.style.left = "100%");
    } else {
      direction === "Right" ? (el.style.left = "275px") : (el.style.left = "0");
    }
  }, 1000);
}
