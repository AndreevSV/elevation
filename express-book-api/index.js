import express from "express";
import { add, deleteById, getAll, getById, update } from "./src/crud.js";

const app = express();
const port = 3000;

app.use(express.json());

const path = "/v1/books";

app.get("/", (req, res) => {
  console.log("Hello World!");
});

app.get(`${path}`, async (req, res) => {
  const books = await getAll();
  res.json(books);
});

app.get(`${path}/:id`, async (req, res) => {
  const book = await getById(parseInt(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).send({ error: "Book not found" });
  }
});

app.get(`${path}/author/:authorName`, async (req, res) => {
    const authorName = req.params.authorName;
  
    try {
      const booksByAuthor = await getByAuthor(authorName);
      if (booksByAuthor.length > 0) {
        res.json(booksByAuthor);
      } else {
        res.status(404).send("No books found for this author"); 
      }
    } catch (error) {
      console.error("Failed to retrieve books:", error);
      res.status(500).send("Internal Server Error"); 
    }
  });

app.post(`${path}`, async (req, res) => {
  try {
    const book = await add(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.put(`${path}/:id`, async (req, res) => {
  try {
    const book = await update(parseInt(req.params.id), req.body);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete(`${path}/:id`, async (req, res) => {
  const success = await deleteById(parseInt(req.params.id));
  if (success) {
    res.status(204).send();
  } else {
    res
      .status(404)
      .send({ error: "Book not found or error deleting the book" });
  }
});

app.listen(port, () => {
  console.log("Express server run on port: ", port);
});
