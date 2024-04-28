let themeButton = document.getElementById("theme-toggle");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("change", toggleDarkMode);

let signButton = document.getElementById("sign-now-button");
const addSignature = (person) => {
  var newSignature = document.createElement("p");
  newSignature.textContent = "🖊️ " + person['name'] + " from " + person['hometown'] + " supports this.";
  document.getElementsByClassName("signatures")[0].appendChild(newSignature);
}

const validateForm = () => {
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;
  const person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value
  };
  if (person.name.length < 2 || person.hometown.length < 2) {
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].classList.add('error');
    }
    containsErrors = true;
  } else {
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].classList.remove('error');
    }
  }
  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
  }
}
signButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll(".revealable");
const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    }
    else {
      revealableContainers[i].classList.remove("active");
    }
  }
}
window.addEventListener('scroll', reveal);

let reduceMotionButton = document.getElementById("reduce-motion-button");
const reduceMotion = () => {
  animation.transitionProperty = 'none';
  animation.transitionDuration = '0s';
  animation.transitionTimingFunction = 'unset';
  animation.transitionDelay = '0s';
  animation.initialOpacity = 1;
  for (let i = 0; i < revealableContainers.length; i++) {
      revealableContainers[i].style.transitionProperty = animation.transitionProperty;
      revealableContainers[i].style.transitionDuration = animation.transitionDuration;
      revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
      revealableContainers[i].style.transitionDelay = animation.transitionDelay;
      revealableContainers[i].style.opacity = animation.initialOpacity; 
  }
}
reduceMotionButton.addEventListener("click", reduceMotion);

const toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = "Thanks for signing, " + person.name + "!";

  // Start animation
  let intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
}

let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");
const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}

let closeButton = document.getElementById("close-modal");
const closeModal = () => {
  let modal = document.getElementById("thanks-modal");
  modal.style.display = "none";
}
closeButton.addEventListener('click', closeModal);
