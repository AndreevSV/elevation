import { contacts } from "../data/contacts.js";

console.log(contacts);

// Array Order Methods

// 1.	Write a function that takes the array of contacts and returns a new array sorted by last name.

const contactsArray = contacts.results;

function sortedByLastName(contactsArray) {
  return contactsArray.sort((a, b) => {
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

console.log(sortedByLastName(contactsArray));

// 2.	Write a function to return the array of contacts in reverse order. Do not use the built-in reverse() method.
function reverseOrderArray(contactsArray) {
  let contactObject = {};
  let reversedOrderArray = [];
  for (let i = contactsArray.length - 1; i >= 0; i--) {
    contactObject = contactsArray[i];
    reversedOrderArray.push(contactObject);
  }
  return reversedOrderArray;
}

console.log(reverseOrderArray(contactsArray));

// 3.	Write a function that returns the first 5 contacts from the sorted list (by last name).
function returnFirstFiveSortedContacts(contactsArray) {
  const sortedByLastNameArray = sortedByLastName(contactsArray);
  return sortedByLastNameArray.slice(0, 5);
}

console.log(returnFirstFiveSortedContacts(contactsArray));

// 4.	Create a function that returns an array of all unique first names. No duplicates should be present.
function returnAllUniqueFirstNames(contactsArray) {
  let firstNamesArray = [];
  for (let i = 0; i < contactsArray.length; i++) {
    const firstName = contactsArray[i].name.first;
    firstNamesArray.push(firstName);
  }

  let uniqueFirstNameArray = [];
  for (let i = 0; i < firstNamesArray.length; i++) {
    let isNameUnique = true;
    for (let j = 0; j < uniqueFirstNameArray.length; j++) {
      if (firstNamesArray[i] === uniqueFirstNameArray[j]) {
        isNameUnique = false;
        break;
      }
    }
    if (isNameUnique) {
      uniqueFirstNameArray.push(firstNamesArray[i]);
    }
  }
  return uniqueFirstNameArray;
}

console.log(returnAllUniqueFirstNames(contactsArray));

// 5.	Write a function that concatenates the first and last name of each contact into a new array of full names.

function concatenateFirstAndLastNames(contactsArray) {
  const fullNameArray = [];
  for (let index = 0; index < contactsArray.length; index++) {
    const fullName =
      contactsArray[index].name.first + " " + contactsArray[index].name.last;
    fullNameArray.push(fullName);
  }
  return fullNameArray;
}

console.log(concatenateFirstAndLastNames(contactsArray));

// Looping Through Arrays
// 1.	Write a loop that iterates through the array and logs each contact's email to the console.
function logEmails(contactsArray) {
  contactsArray.forEach((contact) => console.log(contact.email));
}

logEmails(contactsArray);

// 2.	 Write a function that takes an ID as a parameter and returns the contact with that ID.
function findContactById(uuid) {
  return contactsArray.find((contact) => contact.login.uuid == uuid);
}

console.log(findContactById("2eb053db-195a-43c2-b371-5ad1109f7b71"));

// 3.	Create a function that counts how many contacts are from a specific country. The country should be a parameter of the function.
function countCountries(country) {
  let counter = 0;
  for (let index = 0; index < contactsArray.length; index++) {
    let countryFromArray = contactsArray[index].location.country;
    if (countryFromArray === country) {
      counter++;
    }
  }
  return counter;
}

let country = "Ukraine";
console.log(`Contacts from country ${country}: `, countCountries(country));

// 4.	Write a function that returns a new array of contacts that are within a given age range, e.g., 25 to 35 years old.
function returnContactsWithAgeRange(contactsArray, ageMin, ageMax) {
  let appropriateAgeArray = [];
  for (let index = 0; index < contactsArray.length; index++) {
    let currentAge = contactsArray[index].dob.age;
    if (currentAge >= ageMin && currentAge <= ageMax) {
      appropriateAgeArray.push(contactsArray[index]);
    }
  }
  return appropriateAgeArray;
}

console.log(returnContactsWithAgeRange(contactsArray, 25, 35))