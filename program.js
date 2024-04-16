// todo:
    // 1. Deposit some money
    // 2. Determine number of lines to bet on
    // 3. Collect the bet amount
    // 4. Spin the slot machine
    // 5. Check if the user won
    // 6. Give the user their winnings / take their bet if lost
    // 7. Ask the user to play again

const { parse } = require("path");

// We can create functions for each of these steps

// Common way of creating a function
// function functionName() {}

// But the new way of creating a function is using arrow functions
// const functionName = () => {}

// We need to import the prompt-sync module/package
// This is more like a defining a new function called prompt using the prompt-sync module
const prompt = require("prompt-sync")();

// Creating a function to deposit money
const depositMoney = () => {
    // Inside prompt() we can pass a string that will be displayed to the user
    // We use camel case in JS
    const depositAmount =  prompt("Enter the amount to deposit: ");
    // The value returned by prompt() is always a string
    // We need to convert it to a number and check whether it is a valid number
    // We can use parseFloat() to convert it to a number (float)
    // If the string is not a valid number, parseFloat() will return NaN (Not a Number)
    const numberDepositAmount =  parseFloat(depositAmount);

};

depositMoney();