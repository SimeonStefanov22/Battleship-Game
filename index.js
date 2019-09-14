(function main() {
    const rows = 10;
    const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const battleShip = 5;
    const firstDestroyer = 4;
    const secondDestroyer = 4;
    let gameBoardContainer = document.getElementById("gameBoard");
    let numbersTable = document.getElementById("numbersBoard");
    let lettersTable = document.getElementById("letters");
    let emptyString = document.createElement("div");
    numbersTable.appendChild(emptyString);
    let square;
    let randomNums = randomNumber();
    let startPointBattleShip = randomNums[0];
    let startPointFirstDestroyer = randomNums[1];
    let startPointSecondDestroyer = randomNums[2];
    let pointHorizontalBattleShip = startPointBattleShip;
    let pointVerticalFirstDestroyer = startPointFirstDestroyer;
    let pointVerticalSecondDestroyer = startPointSecondDestroyer;

    console.log(startPointBattleShip);
    console.log(startPointFirstDestroyer);
    console.log(startPointSecondDestroyer);

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
                if (pointHorizontalBattleShip !== startPointBattleShip + battleShip){
                    square.setAttribute("name", "ship");
                    square.setAttribute("data", "battleShip");
                    pointHorizontalBattleShip++;
                }
            }
            if (i === pointVerticalFirstDestroyer && j === startPointFirstDestroyer) {
                if (pointVerticalFirstDestroyer !== startPointFirstDestroyer + firstDestroyer) {
                    square.setAttribute("name", "ship");
                    square.setAttribute("data", "firstDestroyer")
                    pointVerticalFirstDestroyer++;
                }
            }
            if (i === pointVerticalSecondDestroyer && j === startPointSecondDestroyer) {
                if (pointVerticalSecondDestroyer !== startPointSecondDestroyer + secondDestroyer) {
                    square.setAttribute("name", "ship");
                    square.setAttribute("data", "secondDestroyer")
                    pointVerticalSecondDestroyer++;
                }
            }
            gameBoardContainer.appendChild(square);
        }
    }
    //console.log(gameBoardContainer);
    document.getElementById("shootInput").value = '';

})()

function randomNumber() {
    let min = 1;
    let max = 5;
    let randomNumber = 0;
    let randNums = [];
    for (let n = 0; n < 3; n++) {
        let rand = Math.random();
        randomNumber = Math.floor(rand * (max - min + 1)) + min;
        randNums.push(randomNumber)
    }
    randNums = randNums.sort((a, b) => a - b);
    randNums[1]++;
    randNums[2]+= 2;

    return randNums;
}

let  countShoot = 0;

function shot(){
    let coordinates = document.getElementById("shootInput");
    let gameBoardContainer = document.getElementsByClassName("separateSquare");
    let partOfShip = "ship";
    let messageAfterTheShot = document.getElementById("message");
    //console.log(gameBoardContainer);
    for (let separateSquare of gameBoardContainer) {
        let ship = separateSquare.getAttribute("name");
        let shipId = separateSquare.getAttribute("id");
        let shipName = separateSquare.getAttribute("data");
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
    let message = document.getElementById("message");
    let countShips = 0;
    let countBattleShip = 0;
    for (let separateSquare of gameBoardContainer) {
        let ship = separateSquare.getAttribute("name");
        let shipName = separateSquare.getAttribute("data");
        if (shipName === "battleShip") {
            countBattleShip++;
            console.log(countBattleShip);
        }
        if (ship){
            countShips++;
        }

    }
    if (countBattleShip === 0){
        message.innerHTML = "Battle ship sunk";
    }
    if (countShips === 0) {
        message.innerHTML = `Well done! You completed the game in ${countShoot} shots`;
    }
}


















