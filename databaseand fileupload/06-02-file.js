const mysql = require("mysql2/promise");

async function createProductTable() {
  try {
    // Establish connection with MySQL server and the database
    const connection = await mysql.createConnection({
      host: "localhost", // Replace with your MySQL host
      user: "root", // Replace with your MySQL username
      password: "root123", // Replace with your MySQL password
      database: "Node_test", // Make sure the database exists
    });

    // SQL query to create the 'Product' table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Product (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Brand VARCHAR(255),
        Quantity INT DEFAULT 0,
        Price DECIMAL(10, 2) DEFAULT 0.00
      )
    `;

    // Execute the query
    await connection.query(createTableQuery);

    console.log('Table "Product" created successfully');

    // Close the connection
    await connection.end();
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

// Call the function to create the table
createProductTable();
