const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const xClass = 'x';
const oClass = 'circle';
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) { 
    const cell = e.target;
    const currentClass = circleTurn ? oClass : xClass 
    cell.classList.add(currentClass); 
    
    if (checkWin(currentClass)) { 
        endGame(false);
    } else if (isDraw()) {
        endGame(true); 
    } else { 
        circleTurn = !circleTurn; 
        setBoardHoverClass();
    }
}

function endGame(draw) { 
    if (draw) {
        winningMessageTextElement.innerText = "It's a Draw!";
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => { 
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    })
}

function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if (circleTurn) {
        board.classList.add(oClass);
    } else {
        board.classList.add(xClass);
    }
}

function checkWin(currentClass) {
    return winCombinations.some(combination => { 
        return combination.every(index => { 
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

// 

