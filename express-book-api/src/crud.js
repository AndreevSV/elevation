import fs from "fs/promises";

const CONFIG = {
  authorsFilePath: "../express-book-api/public/authors.json",
  booksFilePath: "../express-book-api/public/books.json",
};

async function loadData(path) {
  let data = "";
  switch (path) {
    case CONFIG.booksFilePath:
      data = await fs.readFile(path);
      return JSON.parse(data);
    case CONFIG.authorsFilePath:
      data = await fs.readFile(path);
      return JSON.parse(data);
  }
}

async function saveData(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data), "utf8");
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
}

// Create file with authors
async function saveAuthorsToList() {
  await fs.writeFile(CONFIG.authorsFilePath, "", (error) =>
    console.log("Faild to create a file:", error)
  );
  let authors = new Set();
  const books = await loadData(CONFIG.booksFilePath);
  books.forEach((book) => {
    book.authors.forEach((author) => {
      authors.add(author);
    });
  });
  await fs.appendFile(
    CONFIG.authorsFilePath,
    JSON.stringify([...authors]),
    "utf8"
  );
  console.log(authors);
}

// saveAuthorsToList();

// Get all books in the library
export async function getAll() {
  const books = await loadData(CONFIG.booksFilePath);
  books.forEach((book) => {
    console.log(book);
  });
  return books;
}

// getAll()

// Get all books by the Author name
export async function getByAuthor(author) {
  const books = await loadData(CONFIG.booksFilePath);

  const booksByAuthor = books.filter((book) => {
    return book.authors.some((a) => a === author);
  });
  console.log(booksByAuthor);
  return booksByAuthor;
}

// getByAuthor('Charlie Collins')

// Get book by its id
export async function getById(bookId) {
  const books = await loadData(CONFIG.booksFilePath);
  const book = books.find((book) => {
    return book._id === bookId;
  });
  console.log(book);
  return book;
}

// getById(1)

// Add a new book
export async function add(book) {
  const books = await loadData(CONFIG.booksFilePath);
  const authors = await loadData(CONFIG.authorsFilePath);

  if (books.some((b) => b.isbn === book.isbn)) {
    console.log(`Couldn't add the book, this isbn ${book.isbn} already exist`
    );
    return;
  }

  book.authors.forEach((author) => {
    if (!authors.some((a) => a.name === author)) {
      authors.push(author);
      console.log(`New author ${author} was added to authors`);
    }
  });
  const lastBook = books[books.length - 1];
  book._id = lastBook._id + 1;
  books.push(book);

  await saveData(CONFIG.authorsFilePath, authors);
  await saveData(CONFIG.booksFilePath, books);
  console.log(book);

  return book;
}

const book = {
  title: "Express.js in Action",
  isbn: "1617292427",
  pageCount: 0,
  thumbnailUrl:
    "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/hahn.jpg",
  status: "MEAP",
  authors: ["Evan M. Hahn"],
  categories: [],
};

// add(book); 

// Update an existing book
export async function update(id, updatedBook) {
  const books = await loadData(CONFIG.booksFilePath);

  const bookIndex = books.findIndex(book => book._id === id);
  if (bookIndex === -1) {
    console.log("Book not found");
    return null;
  }

  books[bookIndex] = {...books[bookIndex], ...updatedBook};

  await saveData(CONFIG.booksFilePath, books);
  console.log(`Book with ID ${id} has been updated`);
  return books[bookIndex];
}

const updatedBook = {
  title: "Express.js in Action",
  isbn: "1617292427",
  pageCount: 550,
  thumbnailUrl:
    "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/hahn.jpg",
  status: "MEAP",
  authors: ["Evan M. Hahn"],
  categories: [],
};

// update(787, updatedBook);


// Delete book by id
export async function deleteById(id) {
  const books = await loadData(CONFIG.booksFilePath);
  const authors = await loadData(CONFIG.authorsFilePath);

  const bookIndex = books.findIndex(book => book._id === id);
  if (bookIndex === -1) {
    console.log("Book not found");
    return false;
  }

  const authorsToRemove = books[bookIndex].authors;

  const [deletedBook] = books.splice(bookIndex, 1);

  await saveData(CONFIG.booksFilePath, books);

  authorsToRemove.forEach(author => {
    if (!books.some(book => book.authors.includes(author))) {
      const authorIndex = authors.findIndex(a => a.name === author);
      if (authorIndex !== -1) {
        authors.splice(authorIndex, 1);
      }
    }
  });

  await saveData(CONFIG.authorsFilePath, authors);

  console.log(`Book with ID ${id} and its authors (if not present in other books) have been deleted`);
  return true;
}


// deleteById(787)