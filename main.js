let playerArray = [];
let scoreArray = [];
let diceArray = [];

const submitBtn = document.getElementById('player-submit');
const startBtn = document.getElementById('start-btn');
const rollBtn = document.getElementById('roll-btn');
const endTurnBtn = document.getElementById('end-turn-btn');

window.addEventListener('load', customCSS);
submitBtn.addEventListener('click', addPlayer);
startBtn.addEventListener('mouseup', startGame);
rollBtn.addEventListener('mouseup', rollDice);
endTurnBtn.addEventListener('mouseup', endTurn);

function addPlayer(e) {
    e.preventDefault();
    let playerName = document.getElementById('pname').value;
    playerArray.push(playerName);

    let playerTable = document.getElementById('player-table');
    let newRow = playerTable.insertRow(1);
    let playerCell = newRow.insertCell(0);
    let scoreCell = newRow.insertCell(1);

    playerCell.innerText = playerName;
    scoreCell.innerText = '0'; 
}

function startGame() {
    const addDiv = document.getElementById('add-players');
    const gameDiv = document.getElementById('game');

    if (playerArray.length >= 2) {
        addDiv.style.display = 'none';
        gameDiv.style.display = 'block';
    }
}

function rollDice() {
    let dice1 = document.getElementById('dice1');
    let dice2 = document.getElementById('dice2');
    let randomNum1 = Math.floor(Math.random() * 6) + 1;
    let randomNum2 = Math.floor(Math.random() * 6) + 1;

    diceArray = [];
    diceArray.push(randomNum1, randomNum2);

    dice1.innerText = randomNum1;
    dice2.innerText = randomNum2;

    let i = 0;
    if (dice1 === dice2) {
        i++;
        if(i === 3) {
            //end turn
            //no points
        }
    }

    if (dice1 === 1 || dice2 === 1) {
        //end turn
        //no points
    }
}

function endTurn() {

}

function customCSS() {
    const gameDiv = document.getElementById('game');
    gameDiv.style.display = 'none';
}