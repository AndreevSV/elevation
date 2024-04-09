import { contacts } from "../data/contacts.js";

// console.log(contacts);

// Initially 'contacts' is an object. Get an array of Contacts
const contactsArray = contacts.results;

// Phone and sell numbers not normalized. We need to do it and get a new array
function getContactsArrayWithPhonesLikeANumber(contactsArray) {
  return contactsArray.map((element) => {
    const phone = element.phone.trim();
    element.phone = normalizePhoneLikeANumber(phone);
    const cell = element.cell.trim();
    element.cell = normalizePhoneLikeANumber(cell);
    // console.log(element);
    return element;
  });
}

// Convert an initial phone or cell number to a String Like Number
function normalizePhoneLikeANumber(text) {
  let phoneLikeANumber = "";
  for (const char of text) {
    if (
      char !== "(" &&
      char !== ")" &&
      char !== "-" &&
      char !== "+" &&
      char !== " "
    ) {
      phoneLikeANumber += char;
    }
  }
  return phoneLikeANumber;
}

// Get a new array of contacts with normalized phone and sell numbers and assign it to newContactsArray
// We will use this array in our work further
const normalizedContactsArray =
  getContactsArrayWithPhonesLikeANumber(contactsArray);

//Get an submit button element to set an EventListener on 'click' action
const submitButton = document.getElementById("submitButton");

//Setting EventListener and set function that will
submitButton.addEventListener("click", searchByInput);

//Disable button until text not inputed
const input = document.getElementById("searchField");
input.addEventListener("keyup", (event) => {
  const value = event.currentTarget.value;
  if (value == "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
});

//Main function here - search by input string
function searchByInput(event) {
  event.preventDefault();
  const text = document.getElementById("searchField").value.trim();
  const isText = isNaN(text);
  let targetContactArray;
  if (isText) {
    targetContactArray = searchByName(text);
  } else {
    targetContactArray = searchByPhone(text);
  }

  displayFoundContacts(targetContactArray);
}

//Function for searching for first name or second name by the search string
function searchByName(text) {
  let targetContactArray = [];
  normalizedContactsArray.forEach((element) => {
    const slicedFirstNameOfContact = element.name.first
      .toLowerCase()
      .slice(0, text.length);
    const slicedSecondNameOfContact = element.name.last
      .toLowerCase()
      .slice(0, text.length);
    if (
      text.toLowerCase() === slicedFirstNameOfContact ||
      text.toLowerCase() === slicedSecondNameOfContact
    ) {
      targetContactArray.push(element);
    }
  });
  console.log(targetContactArray);
  return targetContactArray;
}

// Function that uses RegEx for searching for an accurence of inputed text
// to the phone or cell field of contact element
function searchByPhone(text) {
  const searchedNumber = normalizePhoneLikeANumber(text);
  let searchPattern = new RegExp(searchedNumber);
  let targetContactArray = normalizedContactsArray.filter((element) => {
    return (
      searchPattern.test(element.phone) || searchPattern.test(element.cell)
    );
  });
  console.log(targetContactArray);
  return targetContactArray;
}

//Function which display founded array of contacts by name or by phone number
function displayFoundContacts(targetContactArray) {
  const contactsList = document.getElementById("contacts-info");
  contactsList.innerHTML = "";

  targetContactArray.forEach((contact) => {
    const contactElement = document.createElement("div");
    contactElement.className = "contact-info";

    const nameBlock = document.createElement("div");
    nameBlock.className = "contact-name-block";

    const userIcon = document.createElement("i");
    userIcon.className = "fa-solid fa-user";
    nameBlock.appendChild(userIcon);

    const contactEl = document.createElement("p");
    contactEl.textContent = ` ${contact.name.title}  ${contact.name.first} ${contact.name.last}`;
    nameBlock.appendChild(contactEl);

    const infoBlock = document.createElement("div");
    infoBlock.className = "contact-info-block";

    const iconPhone = document.createElement("i");
    iconPhone.className = "fa-solid fa-phone";
    infoBlock.appendChild(iconPhone);

    const phoneEl = document.createElement("p");
    phoneEl.textContent = ` ${contact.phone}`;
    infoBlock.appendChild(phoneEl);

    const iconCell = document.createElement("i");
    iconCell.className = "fa-solid fa-mobile";
    infoBlock.appendChild(iconCell);

    const cellEl = document.createElement("p");
    cellEl.textContent = ` ${contact.cell}`;
    infoBlock.appendChild(cellEl);

    const iconEmail = document.createElement("i");
    iconEmail.className = "fa-solid fa-envelope";
    infoBlock.appendChild(iconEmail);

    const emailEl = document.createElement("p");
    emailEl.textContent = ` ${contact.email}`;
    infoBlock.appendChild(emailEl);

    contactElement.appendChild(nameBlock);
    contactElement.appendChild(infoBlock);

    contactsList.appendChild(contactElement);
  });
}
