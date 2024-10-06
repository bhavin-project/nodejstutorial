const mysql = require("mysql2/promise");

async function createDatabase() {
  try {
    // Create a connection to the MySQL server
    const connection = await mysql.createConnection({
      host: "localhost", // Replace with your MySQL host
      user: "root", // Replace with your MySQL username
      password: "root123", // Replace with your MySQL password
    });

    // Execute SQL query to create the database
    await connection.query("CREATE DATABASE IF NOT EXISTS Node_test");

    console.log('Database "Node_test" created successfully');

    // Close the connection
    await connection.end();
  } catch (err) {
    console.error("Error creating database:", err);
  }
}

// Call the function to create the database
createDatabase();
