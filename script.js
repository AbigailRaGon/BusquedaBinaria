//Necesitamos un booleano para encontrar el numero y dos numeros 1 y 100

let gameStarted = false;
let numberFound = false;
let finalQuestion = false;
let rangeOfNumbers = [1,100];
const questionToUser = document.getElementById("form-label");
const continueButton = document.getElementById("btn-continue");
const cancelButton = document.getElementById("btn-cancel");


//Si user presiona el boton, el juego empieza
// Button to start the game, or if the user answers the questions with yes
continueButton.addEventListener("click", ()=>{
    // Check, if the game has started or not
    if (gameStarted == true) {
        // Check, if the final question has been asked to the user
        if (finalQuestion == true) {
            // If the user pressed YES, show the lower number and restart the game
            resultFound(rangeOfNumbers[0]);
            restartGame();
        } else {
            // If the user answered the question with YES, calculated the next limits
            rangeOfNumbers = positiveAnswer(rangeOfNumbers);
            if (checkIfFinalQuestion(rangeOfNumbers) == true) {
                // Check, if only two or one number are left, then ask the final question
                askFinalQuestion(rangeOfNumbers);
                finalQuestion = true;
            } else {
                // If more than 2 numbers are left, ask the normal question
                askQuestiontoUser(rangeOfNumbers);
            }
        }
    } else {
        // If the game has NOT started, setup the buttons, ask the first question, and set the gameStarted variable to true to indicate, that the game has started
        continueButton.innerHTML = "Si";
        cancelButton.innerHTML = "No";
        askQuestiontoUser(rangeOfNumbers);
        gameStarted = true;
    }
});


// Button to cancel, or if the user answers the questions with no
cancelButton.addEventListener("click", ()=>{
    // Check, if the game has started or not
    if (gameStarted == true) {
        // Check, if the final question has been asked to the user
        if (finalQuestion == true) {
            // If the user pressed NO, show the upper number and restart the game
            resultFound(rangeOfNumbers[1]);
            restartGame();
        } else {
            // If the user answered the question with NO, calculated the next limits
            rangeOfNumbers = negativeAnswer(rangeOfNumbers);
            // Check, if only two or one number are left, then ask the final question
            if (checkIfFinalQuestion(rangeOfNumbers) == true) {
                askFinalQuestion(rangeOfNumbers);
                finalQuestion = true;
            } else {
                // If more than 2 numbers are left, ask the normal question
                askQuestiontoUser(rangeOfNumbers);
            }
        }
    } else {
        // If the game has NOT started, show a message to tell the user to press continue to start the game
        alert("Por favor, click en continuar!");
    }
});


// Function to ask to the user, if his number is between X and Y
function askQuestiontoUser(array){
    let lowerNumber = array[0];
    let upperNumber = array[1];
    // Calculate the middle number between lower and upper number, than round the number down to get whole numbers (2.2 -> 2 or 4.9 -> 4)
    let middleNumber = Math.floor((lowerNumber + upperNumber) / 2); //Math.floor para obtener enteros

    // Ask the user, if his number is between the lower and middle number
    questionToUser.innerHTML = (`¿Tu numero esta entre el ${lowerNumber} y ${middleNumber}?`);
}

// If only 2 or 1 number is left, the question is only asking, if the number of the user is X
function askFinalQuestion(array){
    let lowerNumber = array[0];
    let upperNumber = array[1];

    // Ask the user, if his number is the lower number (else it is the upper number)
    questionToUser.innerHTML = (`¿Tu número es ${lowerNumber}?`);
}

// Check, if the final question has been reached (if only 2 or 1 number is left)
function checkIfFinalQuestion(array){
    let lowerNumber = array[0];
    let upperNumber = array[1];

    // Check if only 2 or 1 number is left. If so, return true to indicate, that the final question has to be asked
    if ((upperNumber - lowerNumber) <= 1) {
        return true;
    } else {
        return false;
    }
}

// If the user answers the question with yes, the binary search is calculating the next limits
function positiveAnswer(array){
    let lowerNumber = array[0];
    let upperNumber = array[1];
    let middleNumber = Math.floor((lowerNumber + upperNumber) / 2);

    // If the user said yes to the question, the binary search will set new limits.
    // In this case the new limit is between lower number and middle number
    upperNumber = middleNumber;
    return [lowerNumber , upperNumber];
}

// If the user answers the question with no, the binary search is calculating the next limits
function negativeAnswer(array){
    let lowerNumber = array[0];
    let upperNumber = array[1];
    let middleNumber = Math.floor((lowerNumber + upperNumber) / 2);

    // If the user said no to the question, the binary search will set new limits.
    // In this case the new limit is between middle number+1 and upper number
    lowerNumber = middleNumber+1;
    return [lowerNumber , upperNumber];
}

// If the number has been found, a text is displayed with the found number
function resultFound(number){
    questionToUser.innerHTML = (`¡Tu número es ${number}!`);
}

// This functions resets all variables and changes the text of the buttons
function restartGame(){
    numberFound = false;
    finalQuestion = false;
    gameStarted = false;
    rangeOfNumbers = [1,100];
    continueButton.innerHTML = "Continuar";
    cancelButton.innerHTML = "Cancelar";
}
