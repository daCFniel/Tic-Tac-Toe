let circleTurn; //Bolean variable recording the current player. True means its O's turn, False means its X's turn (by default it is false so X starts the game)
const gameBoard = document.getElementById("gameBoard"); // Element representing board of the game (it's a table)
let currentStateOfTheBoard = []; // An array representing current state of the game (how X's and O'x are places)
const winningCombinations = [ // A nested array representing all possible win combinations.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var test;

/*Create an empty board, add EventListener to each box
that will trigger only once for the specific box when user clicks it 
and will call a function playerMove.*/
function createBoard(){ 
    let index = 1;
    for(let r = 0; r < 3; r++){ // rows
        const newRow = gameBoard.insertRow(r);

        for(let c = 0; c < 3; c++){ // columns
            const newBox = newRow.insertCell(c)
            newBox.className = "box"+index; // specify class names to define styles in css for the game board
            newBox.addEventListener("click", playerMove, {once: true});
            index++;
        }
    }
}

/*Function that is triggered when user click on an empty box
Determine current player, insert X or O into the box, check for win or lose
and swap turn to the other player*/
function playerMove(event){
    const box = event.target; // Get the specific box that triggered click event
    let currentPlayer; // Tells us who's turn is this, Holds the X or O character based on that
    
    if(circleTurn){//Determine who's turn is this and assign corresponding sign the to the variable currentPlayer
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    drawSign(box, currentPlayer)//Insert X or O into the box.

    for(let i = 0; i < 3; i++){//Iterate through the board to get the current state of it
        for(let j = 0; j < 3; j ++){
            currentStateOfTheBoard.push(gameBoard.firstElementChild.children[i].children[j].innerText);
        }
    }
  
    if(checkIfWin(currentPlayer)){
        showWinningBoxes(currentPlayer);
        finishGame(false);
    }
    else if(checkIfDraw()){
        finishGame(true);
    }
    else{
    swapPlayer();
    }

    currentStateOfTheBoard = []; // Clear the current state of the board
}
//Insert X or O into the box (depends who's turn is this)
function drawSign(box, sign){
    if(circleTurn){
        box.style.color = "green";
    }
    else{
        box.style.color = "red";
    }
    box.innerText = sign;
}
//Simply swap the players
function swapPlayer(){
    circleTurn = !circleTurn;
}
/*Check if current player won a game.
Return True if any of the winning combination matches the current state of the board for current player
False otherwise*/
function checkIfWin(currentPlayer){
    return winningCombinations.some(function(combination) {
        return combination.every(function(index) {
            return currentStateOfTheBoard[index] == currentPlayer;
        });
    });
}
/*Check if the game has ended with a draw. Return True if it a draw
False otherwise*/
function checkIfDraw(){
    if(currentStateOfTheBoard.includes("")){
        return false;
    }
    else{
        return true;
    }
   
}
/*Finish the game, print appropriate message, indicate who won or if its a draw*/
function finishGame(draw){
    if(draw){
        document.getElementById("winMessage").innerText = "It's a draw!";
    }
    else{
        if(circleTurn){
            document.getElementById("winMessage").innerText = "Player 'O' wins!";    
        }
        else{
            document.getElementById("winMessage").innerText = "Player 'X' wins!";    
        }

    }
    document.getElementById("winMessage").style.display = "block";   //show the message
    for(let i = 0; i < 3; i++){//Iterate through the board and block further moves
        for(let j = 0; j < 3; j ++){
            gameBoard.firstElementChild.children[i].children[j].removeEventListener("click", playerMove);
        }
    }
}

/*Color the winning boxes so it's clear what combination won the game*/
function showWinningBoxes(currentPlayer){
    for(let i = 0; i < 3; i++){//Iterate through the board and block further moves
        for(let j = 0; j < 3; j ++){
            if(gameBoard.firstElementChild.children[i].children[j].innerText == currentPlayer){
                 gameBoard.firstElementChild.children[i].children[j].style.backgroundColor = "#cbce2c55";    
             }
         }
     }
    
}

// Reset the game
function resetGame(){
    document.getElementById("winMessage").style.display = "hidden"; //hide the message
    document.getElementById("winMessage").innerText = ""; //clear the message
    circleTurn = false; //so the X's start next game
    removeBoxes();
    createBoard();
}

// Remove all the boxes
function removeBoxes(){
    while (gameBoard.firstChild) {
        gameBoard.firstChild.remove();
    }    
}