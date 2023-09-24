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
  currentPlayer: undefined,
  playerScore: 0, 
  oppScore: 0, 
  playerPods: [4, 4, 4, 4, 4, 4], 
  oppPods: [4, 4, 4, 4, 4, 4], 
  playerGoal: [0], 
  oppGoal: [0] }

const playerGoalElements = document.querySelectorAll(".p1-goal")
const oppGoalElements = document.querySelectorAll(".opp-goal")
const oppPodElements = document.querySelectorAll(".opp-pod")
const playerPodElements = document.querySelectorAll(".p1-pod")

// ! Player Functions

function playerMove(podIndex, playerSelectedPod) {
  if (gameState.currentPlayer === "Opponent") {
    gameState.currentPlayer = "Player"
  }
  if (gameState.currentPlayer === "Player") {
    const marbles = gameState.playerPods[podIndex]
    gameState.playerPods[podIndex] = 0 
    let currentPodIndex = podIndex
    let marbleCount = 0
    let currentPods = gameState.playerPods
    const moveMarble = () => {
      if (marbleCount < marbles) {
        currentPodIndex = (currentPodIndex + 1)
        if (currentPodIndex < 7) {
          if (currentPodIndex === 6 && currentPods === gameState.playerPods) {
            gameState.playerScore++
            gameState.playerGoal[0]++
          } 
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 500)
        } else if (currentPodIndex >= 7) {
          currentPodIndex = 0
          currentPods = currentPods === gameState.playerPods ? gameState.oppPods : gameState.playerPods
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 500)
        }
      } else if (currentPodIndex === 6 && currentPods === gameState.playerPods) {
        playerSelectedPod.classList.remove("player-selected")
        console.log("Added turn")
        playerTurn()
      } else if (currentPodIndex < 6) {
        if (currentPods[currentPodIndex] === 1 && gameState.currentPlayer === "Player" && currentPods === gameState.playerPods) {
          if (currentPodIndex === 5 && gameState.oppPods[0] >= 1 && gameState.playerPods[5] === 1) {
            playerCapture(5, 0, 5)
          } else if (currentPodIndex === 4 && gameState.oppPods[1] > 0 && gameState.playerPods[4] === 1) {
            playerCapture(4, 1, 4)
          } else if (currentPodIndex === 3 && gameState.oppPods[2] > 0 && gameState.playerPods[3] === 1) {
            playerCapture(3, 2, 3)
          } else if (currentPodIndex === 2 && gameState.oppPods[3] > 0 && gameState.playerPods[2] === 1) {
            playerCapture(2, 3, 2)
          } else if (currentPodIndex === 1 && gameState.oppPods[4] > 0 && gameState.playerPods[1] === 1) {
            playerCapture(1, 4, 1)
          } else if (currentPodIndex === 0 && gameState.oppPods[5] > 0 && gameState.playerPods[0] === 1){
            playerCapture(0, 5, 0)
          }
        }
        playerSelectedPod.classList.remove("player-selected")
        console.log("Player turn over")
        switchTurn("Opponent")
      }
      updateUI()
    }
    moveMarble()
  }
}

function playerCapture(currentPodIndex, oppPodIndex, playerPodIndex) {
  console.log("player capture")
  if (currentPodIndex >= 1 && currentPodIndex <= 6 && gameState.oppPods[oppPodIndex] > 0 && gameState.playerPods[playerPodIndex] === 1) {
    gameState.playerScore += gameState.oppPods[oppPodIndex] + gameState.playerPods[playerPodIndex]
    gameState.playerGoal[0] += gameState.oppPods[oppPodIndex] + gameState.playerPods[playerPodIndex]
    gameState.oppPods[oppPodIndex] = 0
    gameState.playerPods[playerPodIndex] = 0
  }
}

function playerTurn() {
  let podIndex
  let playerSelectedPod
  playerPodElements.forEach((pod, index) => {
    pod.addEventListener("click", () => {
      podIndex = index
      playerSelectedPod = document.getElementById(`p1-pod${podIndex}`)
      if (playerSelectedPod) {
        playerSelectedPod.classList.add("player-selected")
      } else {
        console.log("playerSelectedPod is undefined")
      }
      if (gameState.playerPods[podIndex] >= 1) {
        playerMove(podIndex, playerSelectedPod)
        playerSelectedPod.classList.remove("player-selected")
      } else if (gameState.playerPods.every(pod => pod === 0)) {
        switchTurn("Opponent")
      }
    })
  })
}

// ! Opponent Functions

function oppMove(podIndex, oppSelectedPod) {
  if (gameState.currentPlayer === "Player") {
    gameState.currentPlayer = "Opponent"
  }
  console.log("oppMove started")
  if (gameState.currentPlayer === "Opponent") {
    const marbles = gameState.oppPods[podIndex]
    gameState.oppPods[podIndex] = 0
    let currentPodIndex = podIndex
    let marbleCount = 0
    let currentPods = gameState.oppPods
    const moveMarble = () => {
      if (marbleCount < marbles) {
        currentPodIndex = (currentPodIndex + 1)
        if (currentPodIndex < 7) {
          if (currentPodIndex === 6 && currentPods === gameState.oppPods) {
            gameState.oppScore++
            gameState.oppGoal[0]++
          }
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 500)
        } else if (currentPodIndex >= 7) {
          currentPodIndex = 0
          currentPods = currentPods === gameState.oppPods ? gameState.playerPods : gameState.oppPods
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 500)
        }
      } else if (currentPodIndex === 6 && currentPods === gameState.oppPods) {
        oppSelectedPod.classList.remove("opp-selected")
        console.log("Added turn")
        oppTurn()
      } else {
        if (currentPods[currentPodIndex] === 1 && gameState.currentPlayer === "Opponent") {
          if (currentPodIndex === 5 && gameState.playerPods[0] > 0 && gameState.oppPods[5] === 1 && currentPods === gameState.oppPods) {
            oppCapture(5, 0, 5)
          } else if (currentPodIndex === 4 && gameState.playerPods[1] > 0 && gameState.oppPods[4] === 1) {
            oppCapture(4, 1, 4)
          } else if (currentPodIndex === 3 && gameState.playerPods[2] > 0 && gameState.oppPods[3] === 1) {
            oppCapture(3, 2, 3)
          } else if (currentPodIndex === 2 && gameState.playerPods[3] > 0 && gameState.oppPods[2] === 1) {
            oppCapture(2, 3, 2)
          } else if (currentPodIndex === 1 && gameState.playerPods[4] > 0 && gameState.oppPods[1] === 1) {
            oppCapture(1, 4, 1)
          } else if (currentPodIndex === 0 && gameState.playerPods[5] > 0 && gameState.oppPods[0] === 1){
            oppCapture(0, 5, 0)
          }
        }
        oppSelectedPod.classList.remove("opp-selected")
        console.log("Opponent turn over")
        switchTurn("Player")
      }
      
      updateUI()
    }
    moveMarble()
  }
}

function oppCapture(currentPodIndex, playerPodIndex, oppPodIndex) {
  console.log("opponent capture")
  if (currentPodIndex >= 1 && currentPodIndex <= 6 && gameState.playerPods[playerPodIndex] > 0 && gameState.oppPods[oppPodIndex] === 1) {
    gameState.oppScore += gameState.playerPods[playerPodIndex] + gameState.oppPods[oppPodIndex]
    gameState.oppGoal[0] += gameState.playerPods[playerPodIndex] + gameState.oppPods[oppPodIndex]
    gameState.playerPods[playerPodIndex] = 0
    gameState.oppPods[oppPodIndex] = 0
  }
}

let oppTurnCounter = 0
function oppTurn() {
  if (oppTurnCounter < 5) {
    if (gameState.oppPods.every(podCount => podCount === 0)) {
      switchTurn("Player")
      return
    }
    console.log("oppTurn activated")
    const podIndex = Math.floor(Math.random() * 6)
    const oppSelectedPod = document.getElementById(`opp-pod${podIndex}`)
    if (oppSelectedPod) {
      oppSelectedPod.classList.add("opp-selected")
    }
    if (gameState.oppPods[podIndex] >= 1) {
      oppMove(podIndex, oppSelectedPod)
    } else if (gameState.oppPods[podIndex] === 0) {
      oppSelectedPod.classList.remove("opp-selected")
      oppTurn()
    }
    oppTurnCounter++
  } else {
    return
  }
  
}

// ! Turn functions

function switchTurn(currentPlayer) {
  const turnElement = document.querySelector(".text.turn")
  turnElement.textContent = `${currentPlayer}'s Turn!`
  gameState.currentPlayer = currentPlayer
  if (gameState.playerPods.every(podIndex => podIndex === 0) || gameState.oppPods.every(podIndex => podIndex === 0)) {
    endGame()
  } else if (gameState.currentPlayer === "Opponent") {
    oppTurn()
  } else if (gameState.currentPlayer === "Player") {
    playerTurn()
  }
}

function endGame() {
  if (gameState.playerPods.every(pod => pod === 0) && gameState.oppPods.every(pod => pod === 0)) {
    if (gameState.playerGoal[0] > gameState.oppGoal[0]) {
      updateTurn("Game over! Player Wins!")
    } else if (gameState.playerGoal[0] < gameState.oppGoal[0]) {
      updateTurn("Game over! Opponent Wins!")
    } else if (gameState.playerGoal[0] === gameState.oppGoal[0]) {
      updateTurn("Game over! It's a tie!")
    }
  } else if (gameState.playerPods.every(pod => pod === 0)) {
    switchTurn("Opponent")
  } else if (gameState.oppPods.every(pod => pod === 0)) {
    switchTurn("Player")
  }
}

// ! UI Functions

function updateUI() {
  playerPodElements.forEach((pod, index) => {
    pod.innerHTML = ""
    for (let i = 0; i < gameState.playerPods[index]; i++) {
      const marble = document.createElement("div")
      marble.classList.add("marble")
      marble.id = "full"
      pod.appendChild(marble)
    }
  })
  oppPodElements.forEach((pod, index) => {
    pod.innerHTML = ""
    for (let i = 0; i < gameState.oppPods[index]; i++) {
      const marble = document.createElement("div")
      marble.classList.add("marble")
      marble.id = "full"
      pod.appendChild(marble)
    }
  })
  playerGoalElements.forEach((goal, index) => {
    goal.innerHTML = ""
    for (let i = 0; i < gameState.playerGoal[index]; i++) {
      const marble = document.createElement("div")
      marble.classList.add("marble")
      marble.id = "full"
      goal.appendChild(marble)
    }
  })
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

function initialize() {
  const turn = Math.floor(Math.random() * 2)
  if (turn === 0) {
    gameState.currentPlayer = "Player"
    updateTurn("Player's Turn!")
    playerTurn()
  } else if (turn === 1) {
    gameState.currentPlayer = "Opponent"
    updateTurn("Opponent's Turn!")
    oppTurn()
  }
}
console.log("test ready")
initialize()