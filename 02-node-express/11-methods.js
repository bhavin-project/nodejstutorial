const express = require("express");
const app = express();
let { people } = require("./data");

// static assets
app.use(express.static("./methods-public"));
// app.use(express.static("./public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  // const { id, name } = req.body;
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  // res.status(201).json({ success: true, data: [...people, { id, name }] });
  res.status(201).json({ success: true, data: [...people, { name }] });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  // const name = req.body.name;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }

  res.status(401).send("Please Provide Credentials");
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

// In your Express.js application, the lines you provided serve specific purposes related to handling static files and parsing incoming request bodies. Let’s break down each line and explain how they work together in your application.
// 1. Serving Static Files
// javascript
// app.use(express.static("./methods-public"));

// Purpose: This line tells your Express application to serve static files from the methods-public directory. Any files (like HTML, CSS, JavaScript, images, etc.) placed in this directory can be accessed directly via the URL corresponding to their path.
// Example: If you have a file named style.css inside the methods-public directory, it can be accessed at http://localhost:3000/style.css when your server is running.
// 2. Parsing URL-encoded Data
// javascript
// app.use(express.urlencoded({ extended: false }));

// Purpose: This middleware is used to parse incoming requests with URL-encoded payloads (typically from forms). The extended option determines how the URL-encoded data is parsed:
// extended: false: This uses the querystring library to parse the data, which does not support nested objects.
// extended: true: This uses the qs library, which supports rich objects and arrays.
// Example: If you have a form that submits data like this:
// xml
// <form action="/submit" method="POST">
//     <input type="text" name="username" />
//     <input type="submit" value="Submit" />
// </form>

// The data will be available in req.body as:
// javascript
// { username: 'someValue' }

// Parsing JSON Data
// javascript
// app.use(express.json());

// Purpose: This middleware is used to parse incoming requests with JSON payloads. It converts the JSON data in the request body into a JavaScript object, making it accessible via req.body.
// Example: If you send a POST request with a JSON body like:
// json
// { "username": "someValue" }

// You can access it in your route handler as:
// javascript
// app.post('/submit', (req, res) => {
//     console.log(req.body.username); // Outputs: someValue
//     res.send('Data received');
// });
