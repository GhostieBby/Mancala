# Mancala

Welcome to Mancala!

First you'll want to select the game mode you wish to play. You can play against either the computer our a friend.

The goal of the game is to get as many marbles into your pod as possible, and there are two ways to do this that will be discussed later.

The game is played counter-clockwise, and it works by picking a pod you wish to move marbles from, then distributing one to each pod that follows.

The thing to keep in mind when making your move is where the last marble will be placed. If it is placed in your goal, you get another turn! The only way to gain more than one point in a turn is what's called a "steal."

To steal from your opponent's side of the board, a few conditions have to be met. Is there an empty pod on your side of the board? Does your opponent have marbles in the oppoite pod? If so, try landing your final marble in the empty pod! This will "steal" all the marbles from your opponent's pod and send them to your goal, increasing your score significantly!

The best players make use of these opportunities while simultaneously protecting their own!

Something to keep in mind is that when you are going counter-clockwise around the board to place your marbles, you do not have to drop one in their goal!

Once there are no more marbles to be moved, the game ends!


The first big issue I ran into while creating this game was getting everything aligned correctly within CSS. Eventually I realized I had to treat the Mancala board as four separate containers, with the two middle ones stacked atop one another.

The next issue I had, and perhaps the most difficult of all, was getting the marbles to distribute across the opposing board once one had been placed in the current player's goal. I spent the most time on this issue, even at one point considering re-building the game from the ground-up.

Working out the finer details was an issue, but it was perhaps the most entertaining of the bunch. The process of making tiny changes throughout and seeing how impactful those changes can be helped me see the beauty in what I had created.