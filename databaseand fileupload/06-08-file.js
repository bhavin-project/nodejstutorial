const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: false }));

// MySQL connection configuration
const dbConfig = {
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "root123", // Replace with your MySQL password
  database: "Node_test", // Ensure the database exists
};

// Serve HTML form for adding new products
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

// Serve HTML form for deleting a product
app.get("/delete", (req, res) => {
  res.sendFile(path.join(__dirname, "deleteProduct.html"));
});

// Route to handle deleting a product
app.post("/delete-product", async (req, res) => {
  const { id } = req.body;

  try {
    // Establish connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Check if the product with the given id exists
    const [rows] = await connection.execute(
      "SELECT * FROM Product WHERE Id = ?",
      [id]
    );

    if (rows.length === 0) {
      // If product doesn't exist, show an error message
      res.send(
        `<h2>No product found with Id ${id}.</h2><a href="/delete">Try again</a><br><a href="/">Add New Product</a>`
      );
      await connection.end();
      return;
    }

    // Delete the product
    await connection.execute("DELETE FROM Product WHERE Id = ?", [id]);

    // Close the connection
    await connection.end();

    // Show a success message
    res.send(
      `<h2>Product with Id ${id} deleted successfully.</h2><br><a href="/products">View All Products</a><br><a href="/delete">Delete Another Product</a>`
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    res.send(
      '<h2>Error deleting the product. Please try again.</h2><a href="/delete">Try again</a>'
    );
  }
});

// Route to display all products
app.get("/products", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query("SELECT * FROM Product");
    await connection.end();

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

    productTable += `</table><br><a href="/">Add New Product</a><br><a href="/delete">Delete Product</a>`;

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
