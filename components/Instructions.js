//Mobile App Devt (CIT2269) Assignment 2
//author: Razel Ventura, s0541328
//date: 2024-02-12
//Instructions.js
//brief: This component contains the instructions to the game.  

const instructionsText = `
Welcome to Mines Wept! Here's how to play:

1. Select a cell and hope it is not a mine. If you see a 😃 then there is no mine adjacent to that cell. If you see a 😯 then there is at least one mine adjacent to it.

2. If you think a cell contains a mine, long press to put a flag 🚩 on it. That way, you don't accidentally blow up. Long press again to remove a flag.

3. You win by uncovering all the non-mines without blowing up. 

4. The more non-mines you uncover, the more points you get. You also get more points for quicker time and higher difficulty.

5. Chickening out and can't handle the pressure? Just "Give Up". It will still give you a score.

6. But if you want to chicken out without a trace, just click "New Game". You won't see how low you scored.

That's it! May the odds be ever in your favor!
`;

export default instructionsText;