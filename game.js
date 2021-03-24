const cellElements = document.querySelectorAll('[data-cell]'); //Array of cells
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
let circleTurn; //variable to check whose turn it is

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true}); //Listen to a click on each cell just once and then run the function
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) { //When clicked on a cell
    const cell = e.target;
    const currentClass = circleTurn ? oClass : xClass //if 'circleTurn' = true, then set the variable to 'oClass', else set it to xClass
    cell.classList.add(currentClass); //populate the UI. Get the cell clicked and add 'currentClass' to the element targeted
    
    if (checkWin(currentClass)) { //if checkWin() returns true, run inside (true means the player wins)
        endGame(false); //show the msg 'wins'
    } else if (isDraw()) { //CheckWin() returns false, check if isDraw() is true then run inside
        endGame(true); //show the msg 'draw'
    } else { // isDraw() is false then run inside (game is not end)
        circleTurn = !circleTurn; //swap players turn
        setBoardHoverClass(); //give the hover efect
    }
}

function endGame(draw) { //Message display function
    if (draw) {
        winningMessageTextElement.innerText = "It's a Draw!";
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => { //Get the elements inside the array cellElements and loop through it. If all the array elements pass the test it returns true. PS: We have to destructure the 'cellElement' because it doesn't have all the methods available, so we use [... cellElements] syntax to get around it.
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);// Test: Return true if each cell has a class of 'xClass' or 'oClass'
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
    return winCombinations.some(combination => { // Get the array with the winning combinations and loop through it. If some/any of the array elements pass the test it returns true.
        return combination.every(index => { // Test: Get the elements inside the array (eg: [0, 1 ,2]) and loop through it. If all the array elements pass the test it returns true.
            return cellElements[index].classList.contains(currentClass);// Test :Return true if each position on the board that is equivalent to values in the array have a class of the currentClass. Else returns false.
        })
    })
}

// 

