let stratButton = document.getElementById("start");
let newGameButton = document.getElementById("newGame");
let buttons = document.getElementById("buttons");
let checkDiv = document.getElementById("checkDiv");
let expression = document.getElementById("expression");
let expressionField = document.getElementById("expressionField");
let expressText = document.getElementById("expressText");
let checkText = document.getElementById("checkText");
let expressInput = document.getElementById("expressInput");
let timer = document.getElementById("timer");
let gameSettings = document.getElementById("gameSettings");
let nameInp = document.getElementById("nameInp");
let checkButton = document.getElementById("checkInp")
let body = document.getElementsByTagName("body")[0];
let timerInterval;

let wrongAnswersCount = document.getElementById("wrongAnswersCount");
let rightAnswersCount = document.getElementById("rightAnswersCount");

let answersCount = document.getElementById("answersCount");

let emptyName = document.getElementById("emptyName");
let emptyChoose = document.getElementById("emptyChoose");
let invalidTimer = document.getElementById("invalidTimer");

let minusBox = document.getElementById("minusBox");
let plusBox = document.getElementById("plusBox");
let mulBox = document.getElementById("mulBox");
let divBox = document.getElementById("divBox");

let minutes = document.getElementById("minutes")
let seconds = document.getElementById("seconds")

let resultModal = document.getElementById("resultModal");

let expressions = [];
let turn = 0;
let score = 0;
let user;



function cancelGame() {
    gameSettings.style.display = "none";
    resultModal.style.display = "none"
    buttons.style.display = "block";
}

function playGame() {
    gameSettings.style.display = "block";
    buttons.style.display = "none";
    nameInp.value = ""
    minutes.value = ""
    seconds.value = ""
    minusBox.checked = false;
    divBox.checked = false;
    mulBox.checked = false;
    plusBox.checked = false;
}


function start() {
    if (nameInp.value.trim() === "") {
        nameInp.style.border = "3px solid red";
        emptyName.style.display = "block";
    } else if(!minusBox.checked && !plusBox.checked && !mulBox.checked && !divBox.checked) {
        emptyChoose.style.display = "block";
        emptyName.style.display = "none"
        nameInp.style.border = "none"
    } else if (
        (minutes.value.trim() === "" && seconds.value.trim() === "") ||  // Both fields empty
        (seconds.value.trim() !== "" && (parseInt(seconds.value) < 0 || parseInt(seconds.value) >= 60)) ||  // Invalid seconds
        (minutes.value.trim() !== "" && (parseInt(minutes.value) < 0 || parseInt(minutes.value) > 60)) ||  // Invalid minutes
        (minutes.value.trim() === "" && (parseInt(seconds.value) < 10 || parseInt(seconds.value) > 3600)) ||  // Only seconds provided and invalid total time
        (minutes.value.trim() !== "" && seconds.value.trim() === "" && parseInt(minutes.value) * 60 < 10) ||  // Only minutes provided and total time < 10
        (parseInt(minutes.value) * 60 + (seconds.value.trim() !== "" ? parseInt(seconds.value) : 0) > 3600) ||
        (parseInt(minutes.value) * 60 + (seconds.value.trim() !== "" ? parseInt(seconds.value) : 0) < 10)  // Total time > 3600
    )  {
        invalidTimer.style.display = "block"
        emptyChoose.style.display = "none";
    } else {
        score = 0;
        turn = 0;
        expressions = [];
        rightAnswersCount.textContent = 0
        wrongAnswersCount.textContent = 0

        if (plusBox.checked) expressions.push(plusExpressionGenerator)
        if(minusBox.checked) expressions.push(minusExpressionGenerator)
        if(mulBox.checked) expressions.push(multiplicationExpressionGenerator)
        if (divBox.checked) expressions.push(divisionExpressionGenerator);

        
        

        console.log(expressions);

        emptyName.style.display = "none"
        nameInp.style.border = "none"
        emptyChoose.style.display = "none"
        invalidTimer.style.display = "none"
        stratButton.disabled = true
        newGameButton.disabled = true
        stratButton.textContent = 3;
        newGameButton.textContent = 3;
    
        setTimeout(function() {
            stratButton.textContent = 2;
            newGameButton.textContent = 2;
        }, 1000);
    
        setTimeout(function() {
            stratButton.textContent = 1;
            newGameButton.textContent = 1;
        }, 2000);
    
        setTimeout(function() {
            buttons.style.display = "none";
            gameSettings.style.display = "none";
            resultModal.style.display = "none";
            answersCount.style.display = "flex";
            expressionField.style.display = "flex"
            stratButton.disabled = false;
            newGameButton.disabled = false;
            stratButton.textContent = "Start";
            newGameButton.textContent = "New Game";
            timer.style.display = "flex"
            expressionGenerator();
            setTimer();
        }, 3000);
    }
}

function setTimer() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
            const seconds = parseInt(document.getElementById('seconds').value) || 0;

            let totalTime = minutes * 60 + seconds;

            clearInterval(timerInterval); 

            timerInterval = setInterval(() => {
                if (totalTime <= 0) {
                    clearInterval(timerInterval);
                    document.getElementById('timerBox').innerText = "00:00";
                    user = {
                        name: nameInp.value,
                        right: rightAnswersCount.textContent,
                        wrong: wrongAnswersCount.textContent,
                        timer: `${minutes} min. ${seconds} sec.`,
                        score: score
                    }

                    showResult(user)
                } else {
                    const mins = Math.floor(totalTime / 60);
                    const secs = totalTime % 60;
                    document.getElementById('timerBox').innerText = 
                        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
                    totalTime--;
                }
            }, 1000);
}

function showResult(user){
    expressionField.style.display = "none";
    resultModal.style.display = "flex";
    document.getElementById("nameResult").textContent = user.name;
    document.getElementById("rightResult").textContent = `Right Answers: ${user.right}`;
    document.getElementById("wrongResult").textContent = `Wrong Answers: ${user.wrong}`;
    document.getElementById("timerResult").textContent = `Timer: ${user.timer}`;
    document.getElementById("scoreResult").textContent = `Score: ${user.score}`;

}


function plusExpressionGenerator() {
    expression.style.display = "flex";
    expressInput.value = "";
    expressInput.focus();
    checkDiv.style.display = "block";
    body.style.backgroundColor = "#7FE5FF";

    let a, b;
    do {
        a = Math.floor(Math.random() * 21);
        b = Math.floor(Math.random() * 21);
    } while (a + b > 20 || a + b < 10);

    expressText.textContent = `${a} + ${b} =`;

}

function multiplicationExpressionGenerator() {
    expression.style.display = "flex";
    expressInput.value = "";
    expressInput.focus();
    checkDiv.style.display = "block";
    body.style.backgroundColor = "#7FE5FF";

    let a, b;
    do {
        a = Math.floor(Math.random() * 11); // Multiplication table numbers typically range from 0 to 10
        b = Math.floor(Math.random() * 11);
    } while (a * b > 100 || a * b < 10); // Adjust the condition as needed

    expressText.textContent = `${a} * ${b} =`;
}


function minusExpressionGenerator() {
    expression.style.display = "flex";
    expressInput.value = "";
    expressInput.focus();
    checkDiv.style.display = "block";
    body.style.backgroundColor = "#7FE5FF";

    let a, b;
    do {
        a = Math.floor(Math.random() * 21);
        b = Math.floor(Math.random() * 21);
    } while (a - b < 0);

    expressText.textContent = `${a} - ${b} =`;
}

function divisionExpressionGenerator() {
    expression.style.display = "flex";
    expressInput.value = "";
    expressInput.focus();
    checkDiv.style.display = "block";
    body.style.backgroundColor = "#7FE5FF";

    let a, b, result;
    do {
        a = Math.floor(Math.random() * 10) + 1;  // Random number between 1 and 10
        b = Math.floor(Math.random() * 10) + 1;  // Random number between 1 and 10
        result = a * b; // Ensure that result is within the multiplication table
    } while (result > 100 || result < 10); // Adjust the condition as needed

    expressText.textContent = `${result} ÷ ${a} =`;
}

function expressionGenerator() {
    expressions[turn]();
    turn++;
    if (turn >= expressions.length) {
        turn = 0;
    }
}


function checkInp() {
    let str = "";
    for (const i of expressText.textContent) {
        if(i === "÷") str += "/";
        else if (i != "=") str += i;
    }

    if (expressInput.value == eval(str)) {
        checkButton.style.backgroundColor = "#32CD32";
        const answersArr = ["Good Job!", "Excelent!", "Great!", "Very well!"]
        checkButton.textContent = answersArr[ Math.floor( Math.random() * 4 ) ];
        checkButton.disabled = true;
        rightAnswersCount.textContent++;
        score += 10;
        setTimeout(function() {
            expressionGenerator()
            checkButton.style.backgroundColor = "#7b5fa0";
            checkButton.disabled = false;
            expressInput.value = "";
            expressInput.focus();
            checkButton.textContent = "Check";
        }, 700);
    } else {
        checkButton.style.backgroundColor = "#FF0000";
        wrongAnswersCount.textContent++;
        checkButton.textContent = "Wrong answer! Try again :(";
        checkButton.disabled = true;
        score -= 5;
        setTimeout(function() {
            checkButton.style.backgroundColor = "#7b5fa0";
            checkButton.disabled = false;
            expressInput.value = "";
            expressInput.focus();
            checkButton.textContent = "Check";
        }, 700);
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter" && checkButton.textContent === "Check") {
        checkInp();
    }
}
