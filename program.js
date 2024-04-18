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

// We normally declare our gloabl variables at the top of the file (after the imports and the libraries)
// This is a good practice because it is easy to see them and change them if needed
// We need to define the number of ROW and COLUMN in the slot machine
const ROWS = 3;
const COLS = 3;

// We need to define the symbols that can appear in the slot machine
// We can create a map for that
// Map is simillar to a dictionary in Python
// It holds key-value pairs
const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

// We need to define the multiplier for each symbol
// We can create a map for that too
const SYMBOLS_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

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

// Now we need a method to spin the slot machine
const spin = () => {
  // We can put all the of the possible symbols in an array
  // We can use const but still manipulate a the data in a array (adding and removing elements)
  // That's because we are not changing the reference of the array
  // We are changing the data inside the array
  // Because of this array is considered as a reference data type
  const symbols = [];
  // This is gonna loop through the SYMBOLS_COUNT map
  // And give us the symbol and the count of the symbol per iteration
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // This is gonna loop through the count of the symbol
    // We are looping through the count of each symbol
    for (let i = 0; i < count; i++) {
      // This is gonna push the symbol to the symbols array
      symbols.push(symbol);
    }
  }

  // Now we have the symbols array with all the symbols
  // We can now have a nested array to represent the slot machine
  const reels = [];

  // reels = [ [A, B, C], [D, A, B], [C, D, A] ]
  // reel1 = [ A, B, C ]
  // reel2 = [ D, A, B ]
  // reel3 = [ C, D, A ]

  // There are the 3 different reels in the slot machine
  // The actual rows will be like
  // row1 = A D C
  // row2 = B A D
  // row3 = C B A

  // Looping through reels
  for (let i = 0; i < COLS; i++) {
    // You need to push a empty array per reel
    reels.push([]);

    // We need to have a copy of the symbols array per reel
    // Because we need to shuffle the symbols array and we have to remove the selected symbols from the array to avoid duplicates
    // This is called a deep copy
    // We can use the spread operator to create a deep copy of the array
    // This is gonna create a new array with the same elements
    // This is not gonna create a new reference to the array
    // So the main array won't be affected by the changes in the new array
    const reelSymbols = [...symbols];

    // Seeting the symbols for the rows per reel
    for (let j = 0; j < ROWS; j++) {
      // Generating a random index number
      // Math.random -> Generates a random number between 0 and 1
      // Math.random * reelSymbols.length -> Generates a random number between 0 and the length of the reelSymbols array
      // Math.floor -> Rounds the number to the nearest integer (downwards)
      // We can't rownd up because because we might get a value that is greater than the length of the reelSymbols array
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      //Selecting a random symbol from the reelSymbols array
      const selectedSymbol = reelSymbols[randomIndex];

      // Pushing into internal reel arrays (reel1, reel2, reel3)
      reels[i].push(selectedSymbol);

      // Removing the selected symbol from the reelSymbols array
      // We can use the splice() method to remove an element from an array
      // splice() -> Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      // We need to pass the index of the element we want to remove and the number of elements we want to remove
      // We only want to remove 1 element
      reelSymbols.slice(randomIndex, 1);
    }
  }
  return reels;
};

// reels = [ [A, B, C], [D, A, B], [C, D, A] ]
// Inorder the calculate the winnings we need to have the rows of the slot machine
// We need to transpose the matrix / 2D array in order to get the following result
// [ A, D, C ]
// [ B, A, D ]
// [ C, B. A ]

// Let's write a function to traspose the matrix
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

// Now we need to print the rows in the console
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    // We are using the entries() method to get the index of the element
    // Similar to enumerate() in Python
    for (const [i, symbol] of row.entries()) {
      // By += we are concatenating the string (adding the symbol to the string)
      rowString += symbol;
      // We are adding a pipe symbol to separate the symbols only if it's not the last symbol
      if (i < row.length - 1) {
        // By += we are concatenating the string (adding the symbol to the string)
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// We need to get the winnings now
const getWinnings = (rows, betAmount, lines) => {
  // We need to define a variable to store the winnings
  let winnings = 0;

  // Going throught all the number of selected lines by the user
  for (const row = 0; row < lines; row++) {
    // Getting the symbols of the row
    const symbols = rows[row];
    // Creating a boolean variable to check whether all the symbols in the row are the same
    let allSame = true;
    // Getting the symbol of the first column

    const firstSymbol = symbols[0];
    // Going through all the symbols in the row
    for (const symbol of symbols) {
      // Checking whether the symbol is not the same as the first symbol
      if (symbol !== firstSymbol) {
        // Setting the allSame variable to false
        allSame = false;
        // Breaking the loop (exiting the loop)
        break;
      }
    }

    // If all the symbols are the same calculating the winnings
    if (allSame) {
      // SYMBOLS_VALUE[firstSymbol] -> Getting the value of the first symbol of selected lines from the SYMBOLS_VALUE map
      winnings += betAmount * SYMBOLS_VALUE[firstSymbol];
    }

    // Returning the winnings
    return winnings;
  }
};

// Now we need to call the functions

// We need to define this variable using let instead const becuase we need to change the value of this variable
// const -> Can't change the value of the variable
// let -> Can change the value of the variable
let balance = depositMoney();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
// We pass the bet per lines not the total bet
const wins = getWinnings(rows, bet, numberOfLines);
console.log("You have won $ " + wins.toString());
