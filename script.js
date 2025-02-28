const number_of_images = [7, 6, 10, 6, 10, 11, 12, 13, 9, 11, 13, 11, 12, 16, 10, 14, 13, 21, 15, 18, 10, 17, 3, 6, 8, 10, 10, 9, 13, 1, 3, 4, 4, 2, 3, 2, 2, 3, 3];
const level_names = [["Stereo Madness", "Back on Track", "Polargeist", "Dry Out", "Base After Base", "Cant Let Go", "Jumper", "Time Machine", "Cycles", "Xstep", "Clutterfunk", "Theory of Everything", "Electroman Adventures", "Clubstep", "Electrodynamix", "Hexagon Force", "Blast Processing", "Theory of Everything 2", "Geometrical Dominator"], ["Deadlocked", "Fingerdash", "Dash", "Explorers"], ["The Seven Seas", "Viking Arena", "Airborne Robots"], ["Press Start", "Nock Em", "Power Trip"], ["Payload", "Beast Mode", "Machina", "Years", "Frontlines", "Space Pirates", "Striker", "Embers", "Round 1", "Monster Dance Off"]];
const buttons = document.querySelectorAll(".answer");
const levelIds = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [20, 21, 22, 23], [24, 25, 26], [27, 28, 29], [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]]
let chosen_level_names = []
let chosen_levelIds = []

const start_button = document.querySelector(".start");
const image = document.querySelector(".levelimg");
const playSection = document.querySelector(".game");  
const justText = document.querySelector(".justtext")
const optionsSection = document.querySelector(".options")
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const dontshow = document.querySelector(".dontshow")
const gameVersions = document.querySelectorAll('.gameversion')

const scoreText = document.querySelector(".score");
let score = 0;
let bestScore = 0;
let lostt = 0;

let selectedLevel;
let selectedImage;
let interval;

playSection.style.display = "none";

start_button.onclick = start

function shownexttext() {
  if (checkboxes[0].checked) {
    dontshow.style.display = "block"
  } else {
    dontshow.style.display = "none"
  }
}

function start() {
  score = 0;
  lostt = 0;
  chosen_level_names = [];
  chosen_levelIds = [];
  
  if (checkboxes[0].checked) {
    chosen_level_names = chosen_level_names.concat(level_names[0])
    chosen_levelIds = chosen_levelIds.concat(levelIds[0])
    gameVersions[0].style.display = "block"
    if (! checkboxes[1].checked) {
      chosen_level_names = chosen_level_names.concat(level_names[1])
      chosen_levelIds = chosen_levelIds.concat(levelIds[1])
      gameVersions[1].style.display = "block"
    } else {
      gameVersions[1].style.display = "none"
    }
  } else {
    gameVersions[0].style.display = "none"
    gameVersions[1].style.display = "none"
  }
  if (checkboxes[2].checked) {
    chosen_level_names = chosen_level_names.concat(level_names[2])
    chosen_levelIds = chosen_levelIds.concat(levelIds[2])
    gameVersions[2].style.display = "block"
  } else {
    gameVersions[2].style.display = "none"
  }
  if (checkboxes[3].checked) {
    chosen_level_names = chosen_level_names.concat(level_names[3])
    chosen_levelIds = chosen_levelIds.concat(levelIds[3])
    gameVersions[3].style.display = "block"
  } else {
    gameVersions[3].style.display = "none"
  }
  if (checkboxes[4].checked) {
    chosen_level_names = chosen_level_names.concat(level_names[4])
    chosen_levelIds = chosen_levelIds.concat(levelIds[4])
    gameVersions[4].style.display = "block"
  } else {
    gameVersions[4].style.display = "none"
  }

  if (chosen_level_names.length == 0) {
    justText.innerText = "You must select a category:";
    return;
  }
  
  scoreText.innerText = score;
  playSection.style.display = "block";
  optionsSection.style.display = "none";
  
  console.log(chosen_level_names);
  console.log(chosen_levelIds);
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  roll();
}

function roll() {
  selectedLevel = chosen_levelIds[Math.floor(Math.random() * chosen_levelIds.length)]
  selectedImage = Math.ceil(Math.random() * number_of_images[selectedLevel - 1])

  console.log(selectedLevel, selectedImage)
  
  const selectedLevelAlt = selectedLevel.toString().padStart(2, '0');
  const selectedImageAlt = selectedImage.toString().padStart(2, '0');

  if (selectedLevel <= 5 || selectedLevel == 27 || selectedLevel == 28) {
    image.src = `https://kipi91212.github.io/GuessTheOfficialLevel/assets/${selectedLevel}/${selectedLevelAlt}${selectedImageAlt}.jpg`
  } else if (selectedLevel <= 8) {
    image.src = `https://kipi91212.github.io/GuessTheOfficialLevel/assets/${selectedLevel}/${selectedLevelAlt}${selectedImageAlt}.PNG`
  } else {
    image.src = `https://kipi91212.github.io/GuessTheOfficialLevel/assets/${selectedLevel}/${selectedLevelAlt}${selectedImageAlt}.png`
  }

  startCountdown()
}

for (let i = 1; i <= buttons.length; i++) {
  buttons[i - 1].onclick = () => checkAnswer(i)
}

function checkAnswer(answer) {
  if (answer === selectedLevel) {
    roll()
    score++
    scoreText.innerText = score
  } else {
    lost("wrong answer")
  }
}

function lost(reason) {
  optionsSection.style.display = "block";
  playSection.style.display = "none";
  if (score > bestScore) {
    bestScore = score;
  }
  justText.innerText = "You lost due to " + reason + ". Your score was " + score + ". Your best score was " + bestScore + ". You can play again here:";
  lostt = 1;
}

function startCountdown() {
  clearInterval(interval);

  const countdownTime = 5;
  const progressBar = document.getElementById("progressBar");
  let timeLeft = countdownTime;

  progressBar.style.width = "100%";

  interval = setInterval(() => {
    timeLeft--;

    let percentage = (timeLeft / countdownTime) * 100;
    progressBar.style.width = percentage + "%";

    if (lostt == 1) {
      return;
    }
    
    if (timeLeft <= 0) {
      clearInterval(interval);
      progressBar.style.width = "0%";
      lost("time limit")
    }
  }, 1000);
}
