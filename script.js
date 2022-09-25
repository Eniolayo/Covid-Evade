let fields = document.querySelectorAll(".field");
const scoreDisplay = document.querySelector(".score--number"),
  levelDisplay = document.querySelector(".level--number"),
  female = document.querySelector(".female"),
  gameName = document.querySelector(".game--name"),
  gameNameProvider = document.querySelector(".game--name__provider"),
  male = document.querySelector(".male"),
  popup = document.querySelector(".popup"),
  arrowLeft = document.querySelector(".arrow-left"),
  arrowRight = document.querySelector(".arrow-right"),
  start = document.querySelector(".start"),
  errorText = document.querySelector(".error-text"),
  covidSvg = document.querySelector(".bacteria");
let locationTo, dropCount, speed, score, gender;

fields = [...fields];
const enemyZones = fields.slice(0, 72);
const playerZones = fields.slice(72);

start.addEventListener("click", startGame);
female.addEventListener("click", (e) => {
  genderChoice("female");
  female.classList.add("active");
  male.classList.remove("active");
});
male.addEventListener("click", (e) => {
  genderChoice("male");
  male.classList.add("active");
  female.classList.remove("active");
});

// Starting zone
let player = playerZones[4];
let genderChoosen;

function genderChoice(gender) {
  if (gender === "male") {
    gender = "./Asset/man-svgrepo-com.svg";
  }
  if (gender === "female") {
    gender = "./Asset/woman-svgrepo-com.svg";
  }
  player.innerHTML = ` <img src=${gender} class="genderChoosen"  />`;
  genderChoosen = document.querySelector(".genderChoosen");
}
reset();
function movement() {
  arrowLeft.addEventListener("click", () => {
    if (
      playerZones.includes(genderChoosen.parentElement.previousElementSibling)
    ) {
      genderChoosen.parentElement.previousElementSibling.appendChild(
        genderChoosen
      );
    }
  });
  arrowRight.addEventListener("click", () => {
    if (playerZones.includes(genderChoosen.parentElement.nextElementSibling)) {
      genderChoosen.parentElement.nextElementSibling.appendChild(genderChoosen);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "ArrowRight" &&
      playerZones.includes(genderChoosen.parentElement.nextElementSibling)
    ) {
      genderChoosen.parentElement.nextElementSibling.appendChild(genderChoosen);
    } else if (
      event.key === "ArrowLeft" &&
      playerZones.includes(genderChoosen.parentElement.previousElementSibling)
    ) {
      genderChoosen.parentElement.previousElementSibling.appendChild(
        genderChoosen
      );
    }
  });
}
function reset() {
  dropCount = 0;
  speed = 500;
  score = 0;
  scoreDisplay.textContent = 0;
  levelDisplay.textContent = 0;
  enemyZones.forEach((each) => {
    each.innerHTML = "";
  });
  playerZones.forEach((each) => {
    if (!each.innerHTML) return;
    if (each.innerHTML.length > 1) {
      document.images[1].remove();
    }
  });
}
function startGame() {
  if (!gameNameProvider.value) {
    return (errorText.style.display = "block");
  }
  gameName.textContent = gameNameProvider.value;
  covidCreation();
  movement();
  popup.style.display = "none";
}
function covidCreation() {
  let stopGame = false;
  for (let i = enemyZones.length - 1; i >= 0; i--) {
    const nextLocation = fields[i + 9];
    locationTo = fields[i].children["0"];

    if (!locationTo) {
      continue;
    }
    nextLocation.appendChild(locationTo);

    if (playerZones.includes(nextLocation)) {
      if (nextLocation.querySelector(".genderChoosen")) {
        stopGame = true;
      } else {
        levelUpgrade();
      }
    }
  }
  if (dropCount % 1 === 0) {
    const position = Math.floor(Math.random() * 9);
    enemyZones[
      position
    ].innerHTML = `<img src="./Asset/coronavirus-bacteria-svgrepo-com.svg" alt="covid" class="bacteria">`;
  }
  if (stopGame) {
    popup.style.display = "grid";
    popup.innerHTML = `
    <p>Your score is ${score}</p>
    <button class="start" onclick="startGame()">RESTART</button>
    `;
    reset();
  } else {
    dropCount++;
    setTimeout(covidCreation, speed);
  }
}

function levelUpgrade() {
  score++;
  if (score % 20 === 0) {
    speed = Math.max(25, speed - 25);
    levelDisplay.textContent++;
  }
  scoreDisplay.innerHTML = score;
  locationTo.remove();
}
