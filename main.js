// // ! create grid
// // ?  2x8 with the two ends combined
// // ? endzones operating as one pool
// // ? each regular pool begins with 4 marbs

// ! move types
// ? picking up one entire pod
// ? creating marbs in each div window
// ? last marb in endzone grants one more turn
// ? mast marb landing in empty pod steals the marbs opposite that pod

// ! game results
// ? add announcement in place of scrolling text or Turn
// ? 
// ? sound effect for stealing a pod
// ? no marbs left in pod ends game

// ! move timer
// ? timer running out makes random move for player
// ? timer visible on screen

// // ! scoreboard via css (left or right side)
// ? `Player One: ${playerScore}`
// `Player Two: ${playerTwoScore}`
// ? `CPU: ${opponentScore}`

// ! CPU Program
// ? Prioritize turns that grant a second turn OR a steal
// ? Else, math.floor math.random

// ! Player Two Functionality
// ? Flips board 180 degrees
// ? only allowed to move their marbles

// ! Game Mode Menu?
// ? window alert that lets you pick?
// ? entirely different URL possible?

// code

const gameState = {
  currentPlayer: "player",
  playerScore: 0, 
  oppScore: 0, 
  playerPods: [4, 4, 4, 4, 4, 4], 
  oppPods: [4, 4, 4, 4, 4, 4], 
  playerGoal: [0], 
  oppGoal: [0] }

const playerGoalElements = document.querySelectorAll(".p1-goal")
const oppGoalElements = document.querySelectorAll(".opp-goal")

function initialize() {
  const oppPodElemennts = document.querySelectorAll(".opp-pod")
  const playerPodElements = document.querySelectorAll(".p1-pod")
  playerPodElements.forEach((pod, index) => {
    pod.addEventListener("click", () => makeMove(index))
  })
  updateUI()
}

function makeMove(podIndex) {
  if (gameState.currentPlayer === "player" && gameState.playerPods[podIndex] > 0) {
    const marbles = gameState.playerPods[podIndex]
    gameState.playerPods[podIndex] = 0 
    let currentPodIndex = podIndex
    let marbleCount = 0
    let currentPods = gameState.playerPods
    const moveMarble = () => {
      currentPodIndex = (currentPodIndex + 1)
      if (marbleCount < marbles) {
        if (currentPodIndex < 7) {
          if (currentPodIndex === 6) {
            gameState.playerScore++
            gameState.playerGoal[0]++
          } 
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 500)
        } else if (currentPodIndex >= 7) {
          currentPodIndex = 0
          currentPods = gameState.oppPods === currentPods ? gameState.playerPods : gameState.oppPods
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 500)
        }
      } else if (currentPodIndex === 7) {
        initialize()
      } else {
        switchTurn()
        updateTurn(`${gameState.currentPlayer}'s Turn!`)
        if (currentPodIndex[podIndex] === 1) {
          const oppIndex = currentPodIndex
          if (gameState.oppPods[oppIndex] > 0) {
            gameState.playerScore += gameState.oppPods[oppIndex]
            gameState.playerGoal[0] += gameState.oppPods[oppIndex]
            gameState.oppPods[oppIndex] = 0
          }
        }
        oppTurn()
      }
      updateUI()
    }
    moveMarble()
  }
}

function oppMove(podIndex) {
  if (gameState.currentPlayer === "opponent" && gameState.oppPods[podIndex] > 0) {
    const marbles = gameState.oppPods[podIndex]
    gameState.oppPods[podIndex] = 0
    let currentPodIndex = podIndex
    let marbleCount = 0
    let currentPods = gameState.oppPods
    const moveMarble = () => {
      currentPodIndex = (currentPodIndex + 1)
      if (marbleCount < marbles) {
        if (currentPodIndex < 7) {
          if (currentPodIndex === 6) {
            gameState.oppScore++
            gameState.oppGoal[0]++
          }
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 500)
        } else if (currentPodIndex >= 7) {
          currentPodIndex = 0
          currentPods = gameState.playerPods === currentPods ? gameState.oppPods : gameState.playerPods
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 500)
        }
      } else if (currentPodIndex === 7) {
        oppTurn()
      } else {
        switchTurn()
        updateTurn(`${gameState.currentPlayer}'s Turn!`)
        if (currentPodIndex[podIndex] === 1) {
          const playerIndex = currentPodIndex
          if (gameState.playerPods[playerIndex] > 0) {
            gameState.oppScore += gameState.playerPods[playerIndex]
            gameState.oppGoal[0] += gameState.playerPods[playerIndex]
            gameState.playerPods[playerIndex] = 0
          }
        }
        initialize()
      }
      updateUI()
    }
    moveMarble()
  }
}



function oppTurn() {
  if (gameState.currentPlayer === "opponent") {
    const podIndex = Math.floor(Math.random() * 6)
    oppMove(podIndex)
  }
}

function handleOppTurn() {
  if (gameState.currentPlayer === "opponent") {
    oppTurn()
  }
}

function updateUI() {
  const playerPodElements = document.querySelectorAll(".p1-pod")
  playerPodElements.forEach((pod, index) => {
    pod.innerHTML = ""
    for (let i = 0; i < gameState.playerPods[index]; i++) {
      const marble = document.createElement("div")
      marble.classList.add("marble")
      marble.id = "full"
      pod.appendChild(marble)
    }
  })
  const oppPodElements = document.querySelectorAll(".opp-pod")
  oppPodElements.forEach((pod, index) => {
    pod.innerHTML = ""
    for (let i = 0; i < gameState.oppPods[index]; i++) {
      const marble = document.createElement("div")
      marble.classList.add("marble")
      marble.id = "full"
      pod.appendChild(marble)
    }
  })
  const playerGoalElements = document.querySelectorAll(".p1-goal")
  playerGoalElements.forEach((goal, index) => {
    goal.innerHTML = ""
    for (let i = 0; i < gameState.playerGoal[index]; i++) {
      const marble = document.createElement("div")
      marble.classList.add("marble")
      marble.id = "full"
      goal.appendChild(marble)
    }
  })
  const oppGoalElements = document.querySelectorAll(".opp-goal")
  oppGoalElements.forEach((goal, index) => {
    goal.innerHTML = ""
    for (let i = 0; i < gameState.oppGoal[index]; i++) {
      const marble = document.createElement("div")
      marble.classList.add("marble")
      marble.id = "full"
      goal.appendChild(marble)
    }
  })

  const playerScoreElement = document.getElementById("p1-score")
  const oppScoreElement = document.getElementById("opp-score")
  playerScoreElement.textContent = `Player: ${gameState.playerScore}`
  oppScoreElement.textContent = `Opponent: ${gameState.oppScore}`
}


function updateTurn (turnMessage) {
  const turnElement = document.querySelector(".text.turn")
  turnElement.textContent = turnMessage
}

function switchTurn() {
  gameState.currentPlayer = (gameState.currentPlayer === "player") ? "opponent" : "player"
}

initialize()
updateTurn("Player's Turn!")
console.log("test over")