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

// Serve HTML form for searching products by brand
app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "search.html"));
});

// Route to handle searching products by brand
app.get("/search-product", async (req, res) => {
  const brand = req.query.brand;

  try {
    // Establish connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Query to search products by brand
    const searchQuery = `SELECT * FROM product WHERE Brand LIKE ?`;
    const [rows] = await connection.execute(searchQuery, [`%${brand}%`]);

    // Close the connection
    await connection.end();

    // If no products are found, display a message
    if (rows.length === 0) {
      res.send(
        `<h2>No products found for the brand "${brand}".</h2><a href="/search">Try again</a>`
      );
      return;
    }

    // Render the search results in an HTML table
    let searchResults = `
      <h1>Search Results for "${brand}"</h1>
      <table border="1">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>`;

    rows.forEach((row) => {
      searchResults += `
        <tr>
          <td>${row.Id}</td>
          <td>${row.Name}</td>
          <td>${row.Brand}</td>
          <td>${row.Quantity}</td>
          <td>${row.Price}</td>
        </tr>`;
    });

    searchResults += `</table><br><a href="/search">Search Again</a><br><a href="/">Add New Product</a><br><a href="/products">View All Products</a>`;

    // Send the rendered table as a response
    res.send(searchResults);
  } catch (error) {
    console.error("Error searching products:", error);
    res.send(
      '<h2>Error searching for products. Please try again.</h2><a href="/search">Go back</a>'
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

    productTable += `</table><br><a href="/">Add New Product</a>`;

    res.send(productTable);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.send(
      '<h2>Error fetching products. Please try again.</h2><a href="/">Go back</a>'
    );
  }
});

// Route to fetch and display products whose quantity is less than 3
app.get("/low-stock-products", async (req, res) => {
  try {
    // Establish connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Query to get products where quantity is less than 3
    const [rows] = await connection.query(
      "SELECT * FROM Product WHERE Quantity < 3"
    );

    // Close the connection
    await connection.end();

    // Check if any products are found
    if (rows.length === 0) {
      res.send(
        '<h2>No products with low stock (less than 3).</h2><a href="/">Go back</a>'
      );
      return;
    }

    // Render the products in an HTML table
    let lowStockTable = `
      <h1>Low Stock Products (Quantity < 3)</h1>
      <table border="1">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>`;

    rows.forEach((row) => {
      lowStockTable += `
        <tr>
          <td>${row.Id}</td>
          <td>${row.Name}</td>
          <td>${row.Brand}</td>
          <td>${row.Quantity}</td>
          <td>${row.Price}</td>
        </tr>`;
    });

    lowStockTable += `</table><br><a href="/">Add New Product</a><br><a href="/products">View All Products</a>`;

    // Send the rendered table as a response
    res.send(lowStockTable);
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    res.send(
      '<h2>Error fetching low stock products. Please try again.</h2><a href="/">Go back</a>'
    );
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
