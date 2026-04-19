const pass = document.querySelectorAll(".box");
const statusText = document.querySelector("#status");
let currentPlayer = "X";
let board = ["","","","","","","","",""];
let gameActive = true;

const winnerConditions =[  // Condition 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [1,4,7],
    [0,4,8],
    [2,4,6]
];

// Function call

pass.forEach(box => {
    box.addEventListener("click",diceCheck);
});

// Create function for indexing X and O 

function diceCheck(e){
    const index = e.target.dataset.index;
    if(board[index]!=="" || !gameActive)return;
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
}

// Check who is the winner

function checkWinner(){
    let won = false;
    for(let condition of winnerConditions){
        const[a,b,c] = condition;
                                                            
        if(                                                 // Winner implimentation     
            board[a] &&
            board[a] === board [b] &&
            board[a] === board [c]
        ){
            won = true;
            break;
        }    
    }
    if(won){
           statusText.textContent = `player ${currentPlayer} wins !`;
           gameActive = false;
           return; 
        }

        if(!board.includes("")){                               // For Draw
            statusText.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer=== "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;

}

// For game restart 

function restartGame(){
    board = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    pass.forEach(box =>(box.textContent=""));
}