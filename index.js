(function createGameBoardAndShips() {
    const rows = 10;
    const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    class Ship {
        constructor(length, state) {
            this.length = length;
            this.state = state;
        }
    }
    const battleShip = new Ship();
    const firstDestroyer = new Ship();
    const secondDestroyer = new Ship();
    battleShip.length = 5;
    firstDestroyer.length = 4;
    secondDestroyer.length = 4;
    const gameBoardContainer = document.getElementById("gameBoard");
    const numbersTable = document.getElementById("numbersBoard");
    const lettersTable = document.getElementById("letters");
    const emptyString = document.createElement("div");
    numbersTable.appendChild(emptyString);
    let square;
    const randomNums = randomNumber();
    const startPointBattleShip = randomNums[0];
    const startPointFirstDestroyer = randomNums[1];
    const startPointSecondDestroyer = randomNums[2];
    let pointHorizontalBattleShip = startPointBattleShip;
    let pointVerticalFirstDestroyer = startPointFirstDestroyer;
    let pointVerticalSecondDestroyer = startPointSecondDestroyer;

    for (let i = 1; i <= cols.length; i++) {
        let number = document.createElement("div");
        number.textContent = i.toString();
        numbersTable.appendChild(number);
        let letter = document.createElement("div");
        letter.textContent = cols[i - 1];
        lettersTable.appendChild(letter);

        for (let j = 1; j <= rows; j++) {
            square = document.createElement("div");
            square.innerHTML = '.';
            square.id = cols[i - 1] + (j);
            square.className = "separateSquare"
            if (i === startPointBattleShip && j === pointHorizontalBattleShip) {
                if (pointHorizontalBattleShip !== startPointBattleShip + battleShip.length){
                    square.setAttribute("name", "ship");
                    square.setAttribute("data", "battleShip");
                    pointHorizontalBattleShip++;
                }
            }
            if (i === pointVerticalFirstDestroyer && j === startPointFirstDestroyer) {
                if (pointVerticalFirstDestroyer !== startPointFirstDestroyer + firstDestroyer.length) {
                    square.setAttribute("name", "ship");
                    square.setAttribute("data", "firstDestroyer")
                    pointVerticalFirstDestroyer++;
                }
            }
            if (i === pointVerticalSecondDestroyer && j === startPointSecondDestroyer) {
                if (pointVerticalSecondDestroyer !== startPointSecondDestroyer + secondDestroyer.length) {
                    square.setAttribute("name", "ship");
                    square.setAttribute("data", "secondDestroyer");
                    pointVerticalSecondDestroyer++;
                }
            }
            gameBoardContainer.appendChild(square);
        }
    }
    document.getElementById("shootInput").value = '';
})()

function randomNumber() {
    const min = 1;
    const max = 5;
    let randomNumber = 0;
    let randNums = [];
    for (let n = 0; n < 3; n++) {
        let rand = Math.random();
        randomNumber = Math.floor(rand * (max - min + 1)) + min;
        randNums.push(randomNumber)
    }
    randNums = randNums.sort((a, b) => a - b);
    //Created different random numbers
    randNums[1]++;
    randNums[2]+= 2;
    return randNums;
}

let  countShoot = 0;

function shot(){
    let coordinates = document.getElementById("shootInput");
    const gameBoardContainer = document.getElementsByClassName("separateSquare");
    const partOfShip = "ship";
    let  messageAfterTheShot = document.getElementById("message");
    for (let separateSquare of gameBoardContainer) {
        let ship = separateSquare.getAttribute("name");
        let shipId = separateSquare.getAttribute("id");
        separateSquare.getAttribute("data");
        if (coordinates.value.toUpperCase() === shipId && partOfShip === ship) {
            separateSquare.removeAttribute("name");
            separateSquare.removeAttribute("id");
            separateSquare.removeAttribute("data");
            separateSquare.innerHTML = "x";
            countShoot++;
            messageAfterTheShot.innerHTML = "*** Hit ***";
            message()
        }else if (coordinates.value.toUpperCase() === shipId) {
            separateSquare.innerHTML = "-";
            countShoot++;
            messageAfterTheShot.innerHTML = "*** Miss ***";
        }
    }
    document.getElementById("shootInput").value = '';
}

function message() {
    let gameBoardContainer = document.getElementsByClassName("separateSquare");
    let messageSunk = document.getElementById("messageSunk");
    let countShips = 0;
    let counterBattleShip = 0;
    let counterFirstDestroyer = 0;
    let counterSecondDestroyer = 0;
    for (let separateSquare of gameBoardContainer) {
        let ship = separateSquare.getAttribute("name");
        let shipName = separateSquare.getAttribute("data");
        if (shipName === "battleShip") {
            counterBattleShip++;
            console.log(counterBattleShip);
        }
        if (shipName === "firstDestroyer") {
            counterFirstDestroyer++;
        }
        if (shipName === "secondDestroyer") {
            counterSecondDestroyer++;
        }
        if (ship) {
            countShips++;
        }

    }
    if (counterBattleShip === 0){

        messageSunk.innerHTML = "*** Battle ship is sunk ***";
    }
    if (counterFirstDestroyer === 0 ) {
        messageSunk.innerHTML = "*** First Destroyer is ship sunk ***";
    }
    if (counterSecondDestroyer === 0) {
        messageSunk.innerHTML = "*** Second Destroyer is ship sunk ***";
    }
    if (countShips === 0) {
        messageSunk.innerHTML = `Well done! You completed the game in ${countShoot} shots`;
    }
}


















