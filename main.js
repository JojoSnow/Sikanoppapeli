let playerArray = [];
let scoreArray = [];
let diceArray = [];
let diceTotalArray = [];
let diceTotal = 0;

let playerCounter = 0;
let turnCounter = 0;
let roundCounter = 1;
let rowCounter = 0;
let resultCounter = 0;


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
    playerCounter++;

    let playerTable = document.getElementById('player-table');
    let newRow = playerTable.insertRow(playerCounter);
    let playerCell = newRow.insertCell(0);
    let scoreCell = newRow.insertCell(1);
    scoreCell.setAttribute('id', 'result' + playerCounter);

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

    let thisPlayer = document.getElementById('player-name-span');
    thisPlayer.innerText = playerArray[0];
    playerCounter = 1;
}

let i = 0;
function rollDice() {
    let dice1 = document.getElementById('dice1');
    let dice2 = document.getElementById('dice2');
    let randomNum1 = Math.floor(Math.random() * 6) + 1;
    let randomNum2 = Math.floor(Math.random() * 6) + 1;

    diceArray = [];
    diceArray.push(randomNum1, randomNum2);
    dice1.innerText = randomNum1;
    dice2.innerText = randomNum2;
    
    if (randomNum1 === randomNum2) {
        i++;
        turnPoints();
        if(i === 3) {
            endTurnNoPoints();
        }
    } else if (randomNum1 === 1 && randomNum2 !== 1 ||
        randomNum2 === 1 && randomNum1 !== 1) {
        endTurnNoPoints();
    } else {
        turnPoints();
    }
    
    if (randomNum1 !== randomNum2) {
        i = 0;
    }
}

function turnPoints() {
    rowCounter++;
    let diceTable = document.getElementById('player-result-table');
    let newRow = diceTable.insertRow(rowCounter);
    let diceOneCell = newRow.insertCell(0);
    let diceTwoCell = newRow.insertCell(1);
    let diceTotalCell = newRow.insertCell(2);

    diceOneCell.innerText = diceArray[0];
    diceTwoCell.innerText = diceArray[1];
    if (diceArray[0] === 1 && diceArray[1] === 1) {
        diceTotalCell.innerText = 25;
        diceTotal += 25;
    } else if (diceArray[0] === diceArray[1]) {
        diceTotalCell.innerText = (diceArray[0] + diceArray[1]) * 2;
        diceTotal += ((diceArray[0] + diceArray[1]) * 2);
    } else {
        diceTotalCell.innerText = diceArray[0] + diceArray[1];
        diceTotal += diceArray[0] + diceArray[1];
    }
    
    let totalResult = document.getElementById('result');
    totalResult.innerText = diceTotal;
}

function endTurn() { 
    resultCounter++;
    if (playerArray.length === 2 && roundCounter === 1) {
        diceTotalArray.push(diceTotal);
    } else if (roundCounter === 1) {
        diceTotalArray.push(diceTotal);
    } else {
        diceTotalArray[turnCounter] += diceTotal;
    }

    document.getElementById('result' + resultCounter).innerText = diceTotalArray[turnCounter];
    turnCounter++;

    nextPlayer();
    cleanResultTable();

    diceTotal = 0;
    rowCounter = 0;

    endGame();
}

function endTurnNoPoints() {
    resultCounter++;
    if (playerArray.length === 2 && roundCounter === 1) {
        diceTotalArray.push(0);
    } else if (roundCounter === 1) {
        diceTotalArray.push(0);
    } else {
        diceTotalArray[turnCounter] += 0;
    }

    document.getElementById('result' + resultCounter).innerText = diceTotalArray[turnCounter];
    turnCounter++;

    nextPlayer();
    cleanResultTable();

    diceTotal = 0;
    rowCounter = 0;
}

function nextPlayer() {
    let thisPlayer = document.getElementById('player-name-span');
    thisPlayer.innerText = playerArray[playerCounter];
    playerCounter++;
    
    if (playerCounter > playerArray.length) {
        playerCounter = 0;
        thisPlayer.innerText = playerArray[playerCounter];
        playerCounter = 1;
        turnCounter = 0;
        resultCounter = 0;
        roundCounter++;
    } 
}

function cleanResultTable() {
    let tableHeaderRowCount = 1;
    let table = document.getElementById('player-result-table');
    let rowCount = table.rows.length;
    for (let i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    document.getElementById('result').innerText = 0;
}

function endGame() {
    for (let x = 0; x < playerArray.length; x++) {
        if (diceTotalArray[x] >= 100) {
            
            const winner = playerArray[x];
            const winnerPoints = diceTotalArray[x];
            const winnerText = document.getElementById('winner');
            const winnerPointsText = document.getElementById('winner-points');
            winnerText.innerText = winner;
            winnerPointsText.innerText = winnerPoints; 

            const gameDiv = document.getElementById('game');
            gameDiv.style.display = 'none';
            const endGame = document.getElementById('end-game');
            endGame.style.display = 'block';
        }
    }
}

function customCSS() {
    const gameDiv = document.getElementById('game');
    gameDiv.style.display = 'none';
    const endGame = document.getElementById('end-game');
    endGame.style.display = 'none';
}