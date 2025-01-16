//your JS code here. If required.
let currentPlayer = 'player1';
let player1Name = '';
let player2Name = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

document.getElementById('submit').addEventListener('click', startGame);

function startGame() {
    player1Name = document.getElementById('player-1').value.trim();
    player2Name = document.getElementById('player-2').value.trim();
    
    if (!player1Name || !player2Name) {
        alert('Please enter names for both players!');
        return;
    }

    document.querySelector('.player-setup').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';

    displayMessage(`${player1Name}, you're up!`);

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const cellId = event.target.id;
    
    if (board[cellId - 1] || gameOver) return;

    if (currentPlayer === 'player1') {
        event.target.textContent = 'X';
        board[cellId - 1] = 'X';
        currentPlayer = 'player2';
        displayMessage(`${player2Name}, you're up!`);
    } else {
        event.target.textContent = 'O';
        board[cellId - 1] = 'O';
        currentPlayer = 'player1';
        displayMessage(`${player1Name}, you're up!`);
    }

    checkWinner();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            const winner = board[a] === 'X' ? player1Name : player2Name;
            displayMessage(`${winner} congratulations you won!`, true);
            break;
        }
    }

    if (!gameOver && !board.includes('')) {
        displayMessage('It\'s a draw!', true);
    }
}

function displayMessage(message, isWinner = false) {
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = message;
    if (isWinner) {
        messageDiv.classList.add('winner');
    } else {
        messageDiv.classList.remove('winner');
    }
}
