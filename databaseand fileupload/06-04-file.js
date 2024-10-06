const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// MySQL connection configuration
const dbConfig = {
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "root123", // Replace with your MySQL password
  database: "Node_test", // Make sure the database exists
};

// Serve HTML form for adding new products
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

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
      `<h2>Product "${name}" added successfully!</h2><a href="/products">Display All product</a>`
    );
  } catch (error) {
    console.error("Error inserting product:", error);
    res.send(
      `<h2>Error adding product. Please try again.</h2><a href="/">Go back</a>`
    );
  }
});

// Route to display all products
app.get("/products", async (req, res) => {
  try {
    // Establish connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Fetch all records from the Product table
    const [rows] = await connection.query("SELECT * FROM product");

    // Close the connection
    await connection.end();

    // Render the products in an HTML table
    let productTable = `
      <h1>Product List</h1>
      <table border="1">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>`;

    // Iterate through the rows and add them to the HTML table
    rows.forEach((row) => {
      productTable += `
        <tr>
          <td>${row.Id}</td>
          <td>${row.Name}</td>
          <td>${row.Brand}</td>
          <td>${row.Quantity}</td>
          <td>${row.Price}</td>
        </tr>`;
    });

    productTable += `</table><br><a href="/">Add New Product</a>`;

    // Send the rendered table as a response
    res.send(productTable);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.send(
      '<h2>Error fetching products. Please try again.</h2><a href="/">Go back</a>'
    );
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
