/*

Mobile App Devt (CIT2269) Assignment 2
author: Razel Ventura, s0541328
date: 2024-02-12
//.readme
brief: An explanation of the thinking process / considerations for the Mines Wept app.

DIFFICULTY LEVELS
Easy - 3x3 with 1 Mine
Intermediate - 4x4 with 2 Mines
Difficult - 5x5 with 3 Mines

CELL ACTIONS
Short tap to reveal a cell
Long press to flag a cell; another long press to unflag a cell

GAME OVER CONDITIONS
Win - all non-mine cells are revealed
Lose - cell with a mine is clicked
Give up - Give up button is clicked
New Game - New Game is clicked
Note: All of these except for "New Game" will produce a score

SCORE CALCULATION
The scores are based on time, # of correctly revealed non-mines, and difficulty level. 

Time Score:
There is a base score of 500. 1point is deducted from this for every second elapsed.

Reveal Score: 
For every correctly revealed non-mine, the player gets 10 base points. This score is multiplied by the # of mines on the board. 
ie. For easy, that's 10 points x 1 = 10 points; intermediate: 10 points x 2 = 20 points; difficult: 10 points x 3 = 30 points

LOGIC
Mines are randomly placed. The logic is similar to the traditional minesweeper game. However in a traditional minesweeper, the non-mines have numbers that
indicate how many mines are in the surrounding cells. In Mines Wept, instead of numbers, there are emojis to help the player avoid mines.

😯 - indicates that there is at least one mine in the surrounding cells
😃 - indicates that all surrounding cells are non-mines

Hence there is more luck needed in Mines Wept but it still requires some skill.

*/
