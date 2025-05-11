const board = Array(9).fill(null);
const playerSymbol = "X";
const computerSymbol = "O";
let playerScore = 0;
let computerScore = 0;
let ties = 0;
let gameOver = false;

const squares = document.querySelectorAll(".square");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const tiesDisplay = document.getElementById("ties");

const winAudio = new Audio('./audio/win.mp3');
const lossAudio = new Audio('./audio/loss.mp3');
const tieAudio = new Audio('./audio/minecraft_cat.mp3');

squares.forEach((square, index) => {
    square.addEventListener("click", () => {
        if (!board[index] && !gameOver) {
            makeMove(index, playerSymbol);
            if (checkWinner()) {
                playerScore++;
                playerScoreDisplay.textContent = playerScore;
                winAudio.play();
                gameOver = true;
                setTimeout(resetBoard, 1000);
            } else if (board.every(cell => cell !== null)) {
                ties++;
                tiesDisplay.textContent = ties;
                tieAudio.play();
                gameOver = true;
                setTimeout(resetBoard, 1000);
            } else {
                computerMove();
            }
        }
    });
});

function makeMove(index, symbol) {
    board[index] = symbol;
    squares[index].innerHTML = `<img src="./img/${symbol.toLowerCase()}.png" alt="${symbol}">`;
}

function computerMove() {
    let emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex, computerSymbol);
    if (checkWinner()) {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        lossAudio.play();
        gameOver = true;
        setTimeout(resetBoard, 1000);
    } else if (board.every(cell => cell !== null)) {
        ties++;
        tiesDisplay.textContent = ties;
        tieAudio.play();
        gameOver = true;
        setTimeout(resetBoard, 1000);
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetBoard() {
    board.fill(null);
    squares.forEach(square => (square.innerHTML = ""));
    gameOver = false;
}
