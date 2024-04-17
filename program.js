// todo:
// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect the bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings / take their bet if lost
// 7. Ask the user to play again

// We can create functions for each of these steps

// Common way of creating a function
// function functionName() {}

// But the new way of creating a function is using arrow functions
// This is like giving a variable name for a anonymous function
// const functionName = () => {}

// We need to import the prompt-sync module/package
// This is more like a defining a new function called prompt using the prompt-sync module
const prompt = require("prompt-sync")();

// We need to define the number of ROW and COLUMN in the slot machine
const ROW = 3;
const COLUMN = 3;

// Creating a function to deposit money
const depositMoney = () => {
  // This is looping forever until a valid deposit amount is entered and returned
  while (true) {
    // Inside prompt() we can pass a string that will be displayed to the user
    // We use camel case in JS
    const depositAmount = prompt("Enter the amount to deposit: ");
    // The value returned by prompt() is always a string
    // We need to convert it to a number and check whether it is a valid number
    // We can use parseFloat() to convert it to a number (float)
    // If the string is not a valid number, parseFloat() will return NaN (Not a Number)
    const numberDepositAmount = parseFloat(depositAmount);
    // isNaN() is a JS function that checks whether a value is NaN
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount. Please try again.");
    } else {
      return numberDepositAmount;
    }
  }
};

// Creating a function to get the number of lines to bet on
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberLines = parseFloat(lines);
    if (isNaN(numberLines) || numberLines < 1 || numberLines > 3) {
      console.log("Invalid number of lines. Please try again.");
    } else {
      return numberLines;
    }
  }
};

// This is how you pass an argument to a arrow function
const getBet = (balance, numberOfLines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);
    if (isNaN(bet) || bet <= 0 || bet > balance / numberOfLines) {
      console.log(
        // We can use backticks to create a string with variables
        `Invalid bet amount. You can't bet ${numberBet} for ${numberOfLines} lines.`,
        `You total bet is ${numberBet * numberOfLines} but your total balance is ${balance}.`,
        "Please enter again.",
      );
      // All the ways
      // `Invalid bet amount. You can't bet ${numberBet} for ${numberOfLines} lines. Please enter again.`
      // "Invalid bet amount. You can't bet " + numberBet + " for " + numberOfLines + " lines. Please enter again."
      // "Invalid bet amount. You can't bet " , numberBet , " for " , numberOfLines , " lines. Please enter again."
      // "Invalid bet amount. You can't bet %s for %s lines. Please enter again." , numberBet , numberOfLines
    } else {
      return numberBet;
    }
  }
};

// We need to define this variable using let instead const becuase we need to change the value of this variable
// const -> Can't change the value of the variable
// let -> Can change the value of the variable
let balance = depositMoney();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
