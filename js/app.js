let windowWidth = window.innerWidth;

// Header Elements
const header = document.querySelector("header");
let headerWidth = header.offsetWidth;
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
turnBtn.addEventListener("click", async () => {
  windowWidth = window.innerWidth;

  // if flipping to the back
  if (isFrontVisible) {
    fadeInOutHeader(frontNameCont, backNameCont);
    // if in desktop view
    if (windowWidth > 1023) {
      setTimeout(() => {
        rollImgs(true);
      }, 500);
    } else {
      // if in mobile / tablet view
      setTimeout(() => {
        addSpinAnim(logo, "Right");
      }, 500);
    }
  } else {
    // if flipping to the front
    fadeInOutHeader(backNameCont, frontNameCont);
    // if in desktop view
    if (windowWidth > 1023) {
      setTimeout(() => {
        rollImgs(false);
      }, 500);
    } else {
      // if in mobile / tablet view
      setTimeout(() => {
        addSpinAnim(logo, "Left");
      }, 500);
    }
  }
  switchAriaHiddens();
  toggleClass(container.firstElementChild, "flip");
  addSpinAnim(turnSVG, "Right");
});

function rollImgs(bool) {
  if (bool) {
    moveImgAnim.playbackRate = 1;
    moveLogoAnim.playbackRate = 1;
  } else {
    moveImgAnim.playbackRate = -1;
    moveLogoAnim.playbackRate = -1;
  }
  moveImgAnim.play();
  moveLogoAnim.play();
}

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

// move logo back if going from large to small after animation
window.addEventListener("resize", () => {
  console.log(isFrontVisible);
  windowWidth = window.innerWidth;
  headerWidth = header.offsetWidth;
  resetImgPos();
  setImgKeys();
  setLogoKeys();
});

function resetImgPos() {
  if (windowWidth < 1024) {
    logo.style.left = "75%";
  } else {
    if (isFrontVisible) {
      logo.style.left = "120px";
      profileImg.style.left = 0;
    } else {
      logo.style.left = `${headerWidth / 2 - 130}px`;
      profileImg.style.left = `${headerWidth / 2 - 250}px`;
    }
  }
}

// ANIMATIONS
let moveImgKeys;
let moveLogoKeys;
let moveImgAnim;
let moveLogoAnim;

// move / roll profile image
function setImgKeys() {
  let fillSet;
  isFrontVisible ? (fillSet = "forwards") : (fillSet = "backwards");
  moveImgKeys = new KeyframeEffect(
    profileImg,
    [
      { left: 0 },
      { left: `${headerWidth / 2 - 250}px`, transform: "rotate(360deg)" },
    ],
    { duration: 1000, fill: fillSet, easing: "ease-in-out" }
  );
  moveImgAnim = new Animation(moveImgKeys, document.timeline);
}

// move / roll logo
function setLogoKeys() {
  let fillSet;
  isFrontVisible ? (fillSet = "forwards") : (fillSet = "backwards");
  moveLogoKeys = new KeyframeEffect(
    logo,
    [
      { left: "120px" },
      { left: `${headerWidth / 2 - 130}px`, transform: "rotate(360deg)" },
    ],
    { duration: 1000, fill: fillSet, easing: "ease-in-out" }
  );
  moveLogoAnim = new Animation(moveLogoKeys, document.timeline);
}

// initialize animations
setImgKeys();
setLogoKeys();
