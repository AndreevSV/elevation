// Exercise 1: Basic Arithmetic Operations
// Create a chain of promises to perform and log the result of three arithmetic operations in sequence.
// Start with a number, then add 5, multiply by 3, and finally subtract 2.

let num = 5;
const sum = new Promise((resolve, reject) => {
  const sum = num + 5;
  console.log(`Adding to ${num} number 5 equal ${sum}`);
  resolve(sum);
});

sum
  .then((result) => {
    const mult = result * 3;
    console.log(`Multiplying ${result} by number 3 equal ${mult}`);
    return mult;
  })
  .then((result) => {
    const sub = result - 2;
    console.log(`Substraction from ${result} number 2 equal ${sub}`);
    return sub;
  })
  .catch((error) => console.log(`error`));

// Exercise 2: String Manipulation
// Write a promise chain that takes a string, converts it to uppercase, then reverses it, and finally
// appends the string "-finished" at the end. Log the final result. Use `then` for every phase

const str = "abcdfghij";
const upperCaseString = new Promise((resolve, reject) => {
  const upperCaseString = str.toUpperCase();
  console.log(`Upper case string = ${upperCaseString}`);
  resolve(upperCaseString);
});

upperCaseString
  .then((strValue) => {
    const reversedStringArray = strValue.split('').reverse();
    const reversedString = reversedStringArray.join('');
    console.log(`Reversed uppercased string = ${reversedString}`);
    return reversedString;
  })
  .then((strValue) => {
    const concatStr = strValue.concat("-finished");
    console.log(`Concatinated with word '-finished'string ${concatStr}`);
  })
  .catch((error) => console.log(error));

// Exercise 3: Array Filtering and Mapping
// Write a function compareToNum that takes a number as an argument and returns a Promise
// that tests if the value is less than or greater than the value 10 (reject otherwise)

compareToNum({ num: 10, isAboveNum: 5 }) //will reject
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
compareToNum({ num: 10, isAboveNum: 12 }) //will resolve
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

/* Exercise 4: Delayed Greetings
Simulate a delayed greeting with promises. First, wait 2 seconds, then log "Hello", wait another second, and log "World!". Each step should be done in a separate .then().

Exercise 5: Error Handling
Create a promise chain that attempts to parse JSON data. Use a try/catch block within a .then() method to handle JSON parsing errors. If successful, log the parsed object; if an error occurs, log "Invalid JSON".
Bonus
Make an async await version

Exercise 6: Promise all
Create "resolveImmediate" that resolves immediately to a number
Create "resolveDelayed" that resolves to a number after 2 seconds */

function combine(prmX, prmY) {
  return Promise.all([prmX, prmY]).then((values) => {
    return values[0] + values[1];
  });
}
// `fetchX()` should return a promise that is resolved to 25 immediately
// and `fetchY()` should return a promise that is resolved after 2 seconds to 17
combine(resolveImmediate(), resolveDelayed()).then((sum) => {
  console.log(sum);
});
