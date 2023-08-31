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
  currentPlayer: "Player",
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
  if (gameState.currentPlayer === "Player" && gameState.playerPods[podIndex] > 0) {
    const marbles = gameState.playerPods[podIndex]
    gameState.playerPods[podIndex] = 0 
    let currentPodIndex = podIndex
    let marbleCount = 0
    let currentPods = gameState.playerPods
    const moveMarble = () => {
      currentPodIndex = (currentPodIndex + 1)
      if (marbleCount < marbles) {
        if (currentPodIndex < 7) {
          if (currentPodIndex === 6 && currentPods === gameState.playerPods) {
            gameState.playerScore++
            gameState.playerGoal[0]++
          } 
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 700)
        } else if (currentPodIndex >= 7) {
          currentPodIndex = 0
          currentPods = gameState.oppPods === currentPods ? gameState.playerPods : gameState.oppPods
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 700)
        }
      } else if (currentPodIndex === 7) {
        initialize()
      } else if (currentPodIndex < 7) {
        if (currentPods[currentPodIndex - 1] === 1 && gameState.currentPlayer === "Player") {
          if (currentPodIndex === 6 && gameState.oppPods[0] >= 1 && gameState.playerPods[5] === 1) {
            gameState.playerScore += gameState.oppPods[0]
            gameState.playerScore += gameState.playerPods[5]
            gameState.playerGoal[0] += gameState.oppPods[0]
            gameState.playerGoal[0] += gameState.playerPods[5]
            gameState.oppPods[0] = 0
            gameState.playerPods[5] = 0
          } else if (currentPodIndex === 5 && gameState.oppPods[1] > 0 && gameState.playerPods[4] === 1) {
            gameState.playerScore += gameState.oppPods[1]
            gameState.playerScore += gameState.playerPods[4]
            gameState.playerGoal[0] += gameState.oppPods[1]
            gameState.playerGoal[0] += gameState.playerPods[4]
            gameState.oppPods[1] = 0
            gameState.playerPods[4] = 0
          } else if (currentPodIndex === 4 && gameState.oppPods[2] > 0 && gameState.playerPods[3] === 1) {
            gameState.playerScore += gameState.oppPods[2]
            gameState.playerScore += gameState.playerPods[3]
            gameState.playerGoal[0] += gameState.oppPods[2]
            gameState.playerGoal[0] += gameState.playerPods[3]
            gameState.oppPods[2] = 0
            gameState.playerPods[3] = 0
          } else if (currentPodIndex === 3 && gameState.oppPods[3] > 0 && gameState.playerPods[2] === 1) {
            gameState.playerScore += gameState.oppPods[3]
            gameState.playerScore += gameState.playerPods[2]
            gameState.playerGoal[0] += gameState.oppPods[3]
            gameState.playerGoal[0] += gameState.playerPods[2]
            gameState.oppPods[3] = 0
            gameState.playerPods[2] = 0
          } else if (currentPodIndex === 2 && gameState.oppPods[4] > 0 && gameState.playerPods[1] === 1) {
            gameState.playerScore += gameState.oppPods[4]
            gameState.playerScore += gameState.playerPods[1]
            gameState.playerGoal[0] += gameState.oppPods[4]
            gameState.playerGoal[0] += gameState.playerPods[1]
            gameState.oppPods[4] = 0
            gameState.playerPods[1] = 0
          } else if (currentPodIndex === 1 && gameState.oppPods[5] > 0 && gameState.playerPods[0] === 1){
            gameState.playerScore += gameState.oppPods[5]
            gameState.playerScore += gameState.playerPods[0]
            gameState.playerGoal[0] += gameState.oppPods[5]
            gameState.playerGoal[0] += gameState.playerPods[0]
            gameState.oppPods[5] = 0
            gameState.playerPods[0] = 0
          }
          
          console.log(gameState.currentPlayer)
        }
        setTimeout(switchTurn(), 100)
        setTimeout(updateTurn(`${gameState.currentPlayer}'s Turn!`), 400)
        oppTurn()
        setTimeout(console.log(gameState.currentPlayer), 3000)
      }
      updateUI()
    }
    moveMarble()
  }
}

function oppMove(podIndex, oppSelectedPod) {
  if (gameState.currentPlayer === "Opponent") {
    const marbles = gameState.oppPods[podIndex]
    gameState.oppPods[podIndex] = 0
    let currentPodIndex = podIndex
    let marbleCount = 0
    let currentPods = gameState.oppPods
    const moveMarble = () => {
      currentPodIndex = (currentPodIndex + 1)
      if (marbleCount < marbles) {
        if (currentPodIndex < 7) {
          if (currentPodIndex === 6 && currentPods === gameState.oppPods) {
            gameState.oppScore++
            gameState.oppGoal[0]++
          }
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 700)
        } else if (currentPodIndex >= 7) {
          currentPodIndex = 0
          currentPods = gameState.playerPods === currentPods ? gameState.oppPods : gameState.playerPods
          currentPods[currentPodIndex]++
          updateUI()
          marbleCount++
          setTimeout(moveMarble, 700)
        }
      } else if (currentPodIndex === 7) {
        oppSelectedPod.classList.remove("opp-selected")
        oppTurn()
      } else {
        if (currentPodIndex < 7 && currentPods[currentPodIndex - 1] === 1 && gameState.currentPlayer === "Opponent") {
          if (currentPodIndex === 6 && gameState.playerPods[0] > 0 && gameState.oppPods[5] === 1) {
            const playerIndex = 1
            gameState.oppScore += gameState.playerPods[0]
            gameState.oppScore += gameState.oppPods[5]
            gameState.oppGoal[0] += gameState.playerPods[0]
            gameState.oppGoal[0] += gameState.oppPods[5]
            gameState.playerPods[0] = 0
            gameState.oppPods[5] = 0
          } else if (currentPodIndex === 5 && gameState.playerPods[1] > 0 && gameState.oppPods[4] === 1) {
            const playerIndex = 2
            gameState.oppScore += gameState.playerPods[1]
            gameState.oppScore += gameState.oppPods[4]
            gameState.oppGoal[0] += gameState.playerPods[1]
            gameState.oppGoal[0] += gameState.oppPods[4]
            gameState.playerPods[1] = 0
            gameState.oppPods[4] = 0
          } else if (currentPodIndex === 4 && gameState.playerPods[2] > 0 && gameState.oppPods[3] === 1) {
            const playerIndex = 3
            gameState.oppScore += gameState.playerPods[2]
            gameState.oppScore += gameState.oppPods[3]
            gameState.oppGoal[0] += gameState.playerPods[2]
            gameState.oppGoal[0] += gameState.oppPods[3]
            gameState.playerPods[2] = 0
            gameState.oppPods[3] = 0
          } else if (currentPodIndex === 3 && gameState.playerPods[3] > 0 && gameState.oppPods[2] === 1) {
            const playerIndex = 4
            gameState.oppScore += gameState.playerPods[3]
            gameState.oppScore += gameState.oppPods[2]
            gameState.oppGoal[0] += gameState.playerPods[3]
            gameState.oppGoal[0] += gameState.oppPods[2]
            gameState.playerPods[3] = 0
            gameState.oppPods[2] = 0
          } else if (currentPodIndex === 2 && gameState.playerPods[4] > 0 && gameState.oppPods[1] === 1) {
            const playerIndex = 5
            gameState.oppScore += gameState.playerPods[4]
            gameState.oppScore += gameState.oppPods[1]
            gameState.oppGoal[0] += gameState.playerPods[4]
            gameState.oppGoal[0] += gameState.oppPods[1]
            gameState.playerPods[4] = 0
            gameState.oppPods[1] = 0
          } else if (currentPodIndex === 1 && gameState.playerPods[5] > 0 && gameState.oppPods[0] === 1){
            const playerIndex = 6
            gameState.oppScore += gameState.playerPods[5]
            gameState.oppScore += gameState.oppPods[0]
            gameState.oppGoal[0] += gameState.playerPods[5]
            gameState.oppGoal[0] += gameState.oppPods[0]
            gameState.playerPods[5] = 0
            gameState.oppPods[0] = 0
          }
          console.log(gameState.currentPlayer)
        }
        oppSelectedPod.classList.remove("opp-selected")
        setTimeout(switchTurn(), 100)
        setTimeout(updateTurn(`${gameState.currentPlayer}'s Turn!`), 400)
        oppTurn()
        setTimeout(console.log(gameState.currentPlayer), 3000)
      }
      updateUI()
    }
    moveMarble()
  }
}



function oppTurn() {
  if (gameState.currentPlayer === "Opponent") {
    const podIndex = Math.floor(Math.random() * 6)
    const oppSelectedPod = document.getElementById(`opp-pod${podIndex}`)
    if (oppSelectedPod) {
      oppSelectedPod.classList.add("opp-selected")
    }
    oppMove(podIndex, oppSelectedPod)
  }
}

function handleOppTurn() {
  if (gameState.currentPlayer === "Opponent") {
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
  gameState.currentPlayer = (gameState.currentPlayer === "Player") ? "Opponent" : "Player"
}

initialize()
updateTurn("Player's Turn!")
console.log("test over")