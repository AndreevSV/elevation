Express Book api
Avi Koenig
•
15 Apr (Edited 15 Apr)
100 points
Due 16:59
Assignment: Books API Using JSON Data Storage

Objective:
Develop a RESTful API using Express.js that manages a collection of books with in-memory data storage. Each book should include details such as name, price, and author information. Author data will be stored in a JSON array and should be referenced properly in the book entries.

Requirements:

Setup and Initial Configuration:
•	Initialize a new Node.js project and install necessary packages (express, etc.).
•	Set up Express server listening on a suitable port.

Data Model: Define the data structures in-memory:

•	Authors: An array of objects, each representing an author with properties like id, name, and dateOfBirth.
•	Books: An array of objects, each representing a book with properties like name, price, and authorId that references an author’s id.

API Endpoints: Implement the following RESTful endpoints:

•	GET /books: Retrieve a list of all books, optionally include author details embedded in the response.
•	GET /books/:id: Retrieve a specific book by its ID, including author details.
•	POST /books: Create a new book (ensure that the authorId exists in the authors array before adding the book).
•	PUT /books/:id: Update an existing book by its ID.
•	DELETE /books/:id: Delete a book by its ID.

Validation and Error Handling:
•	Validate name and price during book creation and updates. 
•	Ensure authorId exists in the authors array before saving a new book.
•	Implement error handling to respond appropriately when requests fail validation checks or when resources are not found.
Deliverables:
•	Source code committed to a version control repository
