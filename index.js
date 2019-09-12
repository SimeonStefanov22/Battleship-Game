window.onload = function main() {
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
            if (i === startPointBattleShip && j === pointHorizontalBattleShip) {
                if (pointHorizontalBattleShip !== startPointBattleShip + 5){
                    square.setAttribute("value", `${1}`);
                    pointHorizontalBattleShip++;
                }
            }
            if (i === pointVerticalFirstDestroyer && j === startPointFirstDestroyer) {
                if (pointVerticalFirstDestroyer !== startPointFirstDestroyer + 4) {
                    square.setAttribute("value", `${2}`);
                    pointVerticalFirstDestroyer++;
                }
            }
            if (i === pointVerticalSecondDestroyer && j === startPointSecondDestroyer) {
                if (pointVerticalSecondDestroyer !== startPointSecondDestroyer + 4) {
                    square.setAttribute("value", `${3}`);
                    pointVerticalSecondDestroyer++;
                }
            }
            gameBoardContainer.appendChild(square);
        }
    }
    console.log(gameBoardContainer);
    return gameBoardContainer

}

function randomNumber() {
    let min = 1;
    let max = 5;
    let randomNumber = 0;
    let randNums = [];
    let differentRanNums = [];
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

function shot(){

    let coordinates = document.getElementById("shootInput");
    console.log(coordinates.value);
    document.getElementById("shootInput").value = '';
}











