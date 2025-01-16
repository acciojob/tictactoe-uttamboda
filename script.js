let currentPlayer = 'Player 1';
let player1Name = '';
let player2Name = '';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

document.getElementById('submit').addEventListener('click', function () {
    player1Name = document.getElementById('player1').value || 'Player 1';
    player2Name = document.getElementById('player2').value || 'Player 2';

    if (player1Name && player2Name) {
        gameActive = true;
        document.querySelector('.player-setup').style.display = 'none';
        document.querySelector('.game-board').style.display = 'block';
        document.querySelector('.message').textContent = `${player1Name}, you're up`;
    }
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        if (!gameActive || cell.textContent !== '') return;

        const index = cell.id - 1;
        gameBoard[index] = currentPlayer === 'Player 1' ? 'X' : 'O';
        cell.textContent = currentPlayer === 'Player 1' ? 'X' : 'O';

        if (checkWinner()) {
            document.querySelector('.message').textContent = `${currentPlayer} congratulations you won!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
        document.querySelector('.message').textContent = `${currentPlayer}, you're up`;
    });
});

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}
