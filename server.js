const express = require("express");
const { v4: uuidv4 } = require("uuid");

const PORT = 3001;
const app = express();
app.use(express.json());

let books = [];

app.get("/", (req, res) => {
  res.send("Welcome to the Book Directory API (*-*) , (>_<)");
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isn === isbn);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

app.post("/books", (req, res) => {
    const { title, author, publisher, publishedDate, isbn } = req.body;

    if (!title || !author || !isbn) {
        return res.status(400).json({ message: "Title, Author, and ISBN are required" });
    }

    const newBook = {
        id: uuidv4(),
        title,
        author,
        publisher,
        publishedDate,
        isbn
    }

    books.push(newBook);
    res.status(201).json({ message: "Book created", book: newBook });
});

app.put("/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { title, author, publisher, publishedDate } = req.body;

    const bookIndex = books.findIndex(b => b.isbn === isbn);

    if (bookIndex !== -1) {
        books[bookIndex] = {...books[bookIndex], title, author, publisher, publishedDate};
        res.status(200).json({ message: "Book updated", book: books[bookIndex] });
    } else {
        res.status(404).json({ message: "Book not found" })
    }
});

app.delete("/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    const bookIndex = books.findIndex(b => b.isbn === isbn);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(200).json({ message: "Book deleted" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
