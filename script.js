//your JS code here. If required.

const inputContainer = document.getElementById("input-container");
const gameContainer = document.getElementById("game-container");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

const message = document.querySelector("#message");
const error = document.getElementById("error");

const startGame = document.getElementById("startGame");
const restartbtn = document.getElementById("restartBtn");

const cells = document.querySelectorAll(".cell");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer;
let running = false;



restartbtn.addEventListener("click", restart);
startGame.addEventListener("click", start);

function start() {
    if(player1.value==="" ||player2.value==="")
    {
        console.log("enter name");

        error.innerText =" Enter Player's Name";

    }
    else{

        inputContainer.style.display = "none";
    gameContainer.style.display = "block";

    initializeGame();
    }
    
    
}

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));

    player1Name =player1.value;
    player2Name = player2.value;
    currentPlayer = player1Name;
   
    message.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("id");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    if(currentPlayer==player1Name)
    {
        cell.textContent = "X";
    }
    else {
        cell.textContent = "O";
    }
    
}
function changePlayer(){
    currentPlayer = (currentPlayer == player1Name) ? player2Name : player1Name;
    message.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        message.textContent = `${currentPlayer} congratulations you won!`;
        running = false;
    }
    else if(!options.includes("")){
        message.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}


function restart() {
    
    inputContainer.style.display = "inline-flex";
    gameContainer.style.display = "none";
    error.innerText = "";
    player1.value = "";
    player2.value = "";    
}
