# *Mancala*

*Description*
---
Welcome to Mancala!

The game is played counter-clockwise, and it works by picking a pod you wish to move marbles from, then distributing one marble to each pod that follows. The goal of this game is to get as many marbles into your pod as possible, and there are two ways to do this that will be discussed later.

The thing to keep in mind when making your move is where the last marble will be placed. If it is placed in your goal, you get another turn! The only way to gain more than one point in a turn is what's called a "capture."

To capture from your opponent's side of the board, a few conditions have to be met. Is there an empty pod on your side of the board? Does your opponent have marbles in the opposite pod? If so, try landing your final marble in the empty pod! This will capture all the marbles from your opponent's pod and send them to your goal, increasing your score significantly! The best players make use of these opportunities while simultaneously protecting their own marbles from a capture!

Something to keep in mind is that when you are going counter-clockwise around the board to place your marbles, you do not have to drop one in their goal! Once there are no more marbles to be moved, the game ends!
___
*Deployment Link*
---

This site is live at https://ghostiebby.github.io/Mancala/

___
*Timeframe & Working Team (Solo/Pair/Group)*
---
We were tasked with creating a game from the ground up by ourselves, and we were given a week's time to do so.

___
*Technologies Used*
---
For this project I used only JavaScript, CSS, and HTML.

___
*Brief*
---
Technical Requirements

Your app must:

* **Render a game in the browser**
* **Be built on a grid: do not use HTML Canvas for this**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it (we will do this together at the end of the project)
* Use **semantic markup** for HTML and CSS (adhere to best practices)

Necessary Deliverables

* A **working game, built by you**, hosted somewhere on the internet
* A **link to your hosted working game** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
* **A ``readme.md`` file** with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc. (completed post project)

---
*Planning*
---
For this project, I decided to keep the planning phase geared towards how my own mind works, as I was creating everything by myself. I wrote pseudocode to get a rough idea of the processes I'd be implementing within the game.

___
*Build/Code Process*
---
When I began to code, I simply went down the list adding function after function that implements those processes. By the end of this step, I merely had to move everything into the right order and make sure they acted as they should. My biggest struggle when approaching any project like this is getting caught up on the bigger picture and not knowing where to begin. With this method of planning, I can easily separate things into minor tasks.

---
*Challenges*
---

The first big issue I ran into while creating this game was getting everything aligned correctly within CSS. Eventually I realized I had to treat the Mancala board as four separate containers, with the two middle ones stacked atop one another.

The next issue I had, and perhaps the most difficult of all, was getting the marbles to distribute across the opposing board once one had been placed in the current player's goal. I spent the most time on this issue, even at one point considering re-building the game from the ground-up.

Working out the finer details was an issue, but it was perhaps the most entertaining of the bunch. The process of making tiny changes throughout and seeing how impactful those changes can be helped me see the beauty in what I had created.