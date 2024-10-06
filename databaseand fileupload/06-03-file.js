const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: false }));

// Serve static HTML form from views directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

// MySQL connection configuration
const dbConfig = {
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "root123", // Replace with your MySQL password
  database: "Node_test", // Ensure the database exists
};

// Route to handle form submission and insert data into MySQL
app.post("/add-product", async (req, res) => {
  const { name, brand, quantity, price } = req.body;

  try {
    // Establish connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Insert product data into Product table
    const insertQuery = `
      INSERT INTO Product (Name, Brand, Quantity, Price)
      VALUES (?, ?, ?, ?)
    `;

    await connection.execute(insertQuery, [name, brand, quantity, price]);

    console.log(`Product ${name} added to the database.`);

    // Close the connection
    await connection.end();

    // Send a success message
    res.send(
      `<h2>Product "${name}" added successfully!</h2><a href="/">Add another product</a>`
    );
  } catch (error) {
    console.error("Error inserting product:", error);
    res.send(
      `<h2>Error adding product. Please try again.</h2><a href="/">Go back</a>`
    );
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
