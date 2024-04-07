import { contacts } from "../data/contacts.js";

// Array Order Methods

// 1.	Write a function that takes the array of contacts and returns a new array sorted by last name.

const contactsArray = contacts.results;
const cloneArray = structuredClone(contactsArray);

function sortedByLastName(cloneArray) {
  return cloneArray.sort((a, b) => {
    const lastnameA = a.name.last.toLowerCase();
    const lastnameB = b.name.last.toLowerCase();

    if (lastnameA > lastnameB) {
      return 1;
    }
    if (lastnameA < lastnameB) {
      return -1;
    }
    return 0;
  });
}

// 2.	Write a function to return the array of contacts in reverse order. Do not use the built-in reverse() method.
function reverseOrderArray(cloneArray) {
  let reversedOrderArray = [];
  for (let i = cloneArray.length - 1; i >= 0; i--) {
    reversedOrderArray.push(cloneArray[i]);
  }
  return reversedOrderArray;
}

// 3.	Write a function that returns the first 5 contacts from the sorted list (by last name).
function returnFirstFiveSortedContacts(cloneArray) {
  const sortedByLastNameArray = sortedByLastName(cloneArray);
  return sortedByLastNameArray.slice(0, 5);
}

// 4.	Create a function that returns an array of all unique first names. No duplicates should be present.
function returnAllUniqueFirstNames(cloneArray) {
  let firstNamesArray = cloneArray.map((element) => element.name.first);
  return Array.from(new Set(firstNamesArray));
}

// 5.	Write a function that concatenates the first and last name of each contact into a new array of full names.
function concatenateFirstAndLastNames(cloneArray) {
  const fullNameArray = [];
  for (let index = 0; index < cloneArray.length; index++) {
    const fullName =
      cloneArray[index].name.first + " " + cloneArray[index].name.last;
    fullNameArray.push(fullName);
  }
  return fullNameArray;
}

// Looping Through Arrays
// 1.	Write a loop that iterates through the array and logs each contact's email to the console.
function logEmails(cloneArray) {
  cloneArray.forEach((contact) => console.log(contact.email));
}

logEmails(cloneArray);

// 2.	 Write a function that takes an ID as a parameter and returns the contact with that ID.
function findContactById(uuid) {
  return cloneArray.find((contact) => contact.login.uuid == uuid);
}

// 3.	Create a function that counts how many contacts are from a specific country. The country should be a parameter of the function.
function countCountries(cloneArray, country) {
  return cloneArray.reduce((accumulator, item) => {
    if (country === item.location.country) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0);
}

let country = "Ukraine";
console.log(
  `Contacts from country ${country}: `,
  countCountries(cloneArray, country)
);

// 4.	Write a function that returns a new array of contacts that are within a given age range, e.g., 25 to 35 years old.
function returnContactsWithAgeRange(cloneArray, ageMin, ageMax) {
  return cloneArray.filter((item) => {
    if (item.dob.age >= ageMin && item.dob.age <= ageMax) {
      return item;
    }
  });
}
