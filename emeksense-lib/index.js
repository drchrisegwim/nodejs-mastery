// To publish your module to npm run "npm login/ npm addUser" on the terminal.
// Then run "npm publish"
// "npm version minor" to change the minor version to new one.

const express = require("express");
const app = express();
app.use(express.json());

const Joi = require("joi");

const books = [
  { id: 1, title: "Nodejs Mastry" },
  { id: 2, title: "Introduction to algorithm" },
  { id: 3, title: "How to make money" },
  { id: 4, title: "Purpose driven life" },
  { id: 5, title: "React js fundamentals" }
];

//Add
module.exports.add = function(a, b) {
  return a + b;
};

//Sub
module.exports.sub = function(a, b) {
  return a - b;
};

//Mul
module.exports.mul = function(a, b) {
  return a * b;
};

//Div
module.exports.div = function(a, b) {
  return a / b;
};

// Http get
app.get("/api/books", (req, res) => {
  res.send(books);
});

// Http post
app.post("/api/books", (req, res) => {
  const result = validateBooks(req.body);
  if (result.error) {
    return res.send(400, result.error.details[0].message);
  }

  const book = {
    id: books.length + 1,
    title: req.body.title
  };
  books.push(book);
  res.send(book);
});

// Http put
app.put("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.send(
      404,
      `The book you want to update with id: ${req.params.id} doesnt exist!`
    );
  }

  var result = validateBooks(req.body);
  if (result.error) {
    return res.send(400, result.error.details[0].message);
  }

  book.title = req.body.title;
  res.send(book);
});

// http Delete
app.delete("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.send(
      404,
      `The book you want to delete with id: ${req.params.id} doesnt exist!`
    );
  }
  const index = books.indexOf(book);
  books.splice(index, 1);
  res.send(book);
});

// Validation using JOI
function validateBooks(book) {
  const schema = {
    title: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(book, schema);
}

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
