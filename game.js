let dimX = 5; // The initial board size is dimX x dimY
let dimY = 5; //
const winLength = 5; // How many stones needed to win
const board = []; // The game board
let turn = 'X'; // Starting player. The other player is 'O'.

function initializeGame() {
    // TODO: Task 1
    // Initialize the game board to be an array of five arrays.
    // Each of the inner arrays should contain five empty strings.
    // Use the variables dimX and dimY instead of hard coding the number five.
    for (let i = 0; i < dimX; i++) {
        let row = []; // create a row
        board.push(row);
        for (let j = 0; j < dimY; j++) {
            row.push(''); // create empty cells
        }
    }
}

function nextTurn() {
    if (turn === 'X') {
        turn = 'O';
    }
    else {
        turn = 'X';
    }
    let turnLabel = document.getElementById('turn');
    turnLabel.textContent = turn;
}

function checkWin(x, y) {
    // TODO: Task 3
    // Hint: be careful to keep yourself inside of the game board!
    // Check the neighbouring squares of the square x,y.
    // If any of them contain same character as the current turn,
    // keep on checking to that direction -- and to the opposite!
    // Number of the stones needed is in variable winLength.
}

function expandBoard(direction) {
    // TODO: Task 2 B
    // This function adds a column or a row to the board
    // depending on the direction it gets as an argument.

    if (direction === 'LEFT') {
        for (let i = 0; i < dimX; i++) {
            board[i].unshift('');
        }
        dimX++;
    }

    if (direction === 'RIGHT') {
        for (let i = 0; i < dimX; i++) {
            board[i].push('');
        }
        dimX++;
    }

    if (direction === 'UP') {
        const row = [];
        board.unshift(row);
        for (let i = 0; i < dimY; i++) {
            row.push('');
        }
        dimY++;
        // add the upper corner if corner cell is selected
        if (dimX === dimY) {
            row.push('');
        }
    }

    if (direction === 'DOWN') {
        const row = [];
        board.push(row);
        for (let i = 0; i < dimY; i++) {
            row.push('');
        }
        dimY++;
        // add the lower corner if corner cell is selected
        if (dimX === dimY) {
            row.push('');
        }
    }
    console.log(board);
    drawBoard();
}

function handleClick(event) {
    let square = event.target;
    let x = square.dataset.x;
    let y = square.dataset.y;

    board[y][x] = turn;
    square.textContent = turn;
    square.removeEventListener('click', handleClick);

    checkWin(x, y);

    // TODO: Task 2 A
    // Implement the conditions when the board should be expanded.
    // Ie when the player clicks the extreme rows or columns.
    
    if (x === '0') {
        expandBoard('LEFT');
    }
    else if (x === (dimX - 1).toString()) {
        expandBoard('RIGHT');
    }
    if (y === '0') {
        expandBoard('UP');
    }
    else if (y === (dimY - 1).toString()) {
        expandBoard('DOWN');
    }

    nextTurn();
}

function createSquare(boardDiv, x, y) {
    let element = document.createElement('div');
    element.setAttribute('class', 'square');
    element.setAttribute('data-x', x);
    element.setAttribute('data-y', y);
    element.textContent = board[y][x];

    if (board[y][x] === '') {
        element.addEventListener('click', handleClick);
    }

    // make the grid (board on the page) grow as the arrays do
    const boardDisplay = document.querySelector('#board');
    boardDisplay.style.gridTemplateColumns = `repeat(${dimX}, 1fr)`;
    boardDisplay.style.gridTemplateRows = `repeat(${dimY}, 1fr)`;
    
    boardDiv.appendChild(element);
}



function drawBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = ''; // Clear the board first!

    for (let y = 0; y < dimY; y++) {
        for (let x = 0; x < dimX; x++) {
            createSquare(boardDiv, x, y);
        }
    }
}

initializeGame();
drawBoard();
