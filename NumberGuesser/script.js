let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

function generateTarget() {
    return Math.floor(Math.random() * 10);
}

function getAbsoluteDistance(firstNum, secondNum) {
    return Math.abs(firstNum - secondNum);
}

function compareGuesses(userGuess, computerGuess, target) {

    let userCloseness = getAbsoluteDistance(userGuess, target);
    let computerCloseness = getAbsoluteDistance(computerGuess, target);

    return userCloseness < computerCloseness || userCloseness === computerCloseness;
}

function updateScore(winner) {
    if(winner === 'human')
        humanScore++;

    if(winner === 'computer')
        computerScore++;
}

function advanceRound() {
    currentRoundNumber++;
}