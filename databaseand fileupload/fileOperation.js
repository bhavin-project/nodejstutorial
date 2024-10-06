const express = require("express");
const multer = require("multer");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// MySQL connection configuration
const dbConfig = {
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "root123", // Replace with your MySQL password
  database: "Node_test", // Ensure the database exists
};

// Set up storage engine to save files to 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Save files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName); // Use current timestamp + original extension as file name
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Serve HTML file for uploading
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
});

// Route to handle file upload and save file path to database
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.send("No file uploaded.");
  }

  const fileName = req.file.filename;
  const filePath = path.join("uploads", fileName);

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Insert file name and path into the database
    await connection.execute(
      "INSERT INTO Files (file_name, file_path) VALUES (?, ?)",
      [fileName, filePath]
    );

    await connection.end();

    res.send(
      `<h2>File uploaded successfully and saved to database.</h2><a href="/files">View Uploaded Files</a>`
    );
  } catch (error) {
    console.error("Error saving file to database:", error);
    res.send("Error saving file to database.");
  }
});

// Route to display all files with options to view/download
app.get("/files", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Fetch all files from the database
    const [rows] = await connection.execute("SELECT * FROM Files");
    await connection.end();

    let fileLinks = "<h1>Uploaded Files</h1><ul>";

    rows.forEach((row) => {
      const fileExtension = path.extname(row.file_name).toLowerCase();
      const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

      // If it's an image, display it using an <img> tag
      if (imageExtensions.includes(fileExtension)) {
        fileLinks += `
          <li>
            <img src="/${row.file_path}" width="200" height="200" alt="${row.file_name}"><br>
            <a href="/download/${row.id}">Download ${row.file_name}</a>
          </li><br>`;
      } else {
        // For non-image files, provide a download link
        fileLinks += `
          <li>
            <a href="/uploads/${row.file_name}" target="_blank">${row.file_name}</a> 
            - <a href="/download/${row.id}">Download</a>
          </li><br>`;
      }
    });

    fileLinks += '</ul><br><a href="/">Upload More Files</a>';
    res.send(fileLinks);
  } catch (error) {
    console.error("Error fetching files from database:", error);
    res.send("Error fetching files from database.");
  }
});

// Route to download a file using its ID
app.get("/download/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Fetch the file path based on the ID
    const [rows] = await connection.execute(
      "SELECT * FROM Files WHERE id = ?",
      [fileId]
    );
    await connection.end();

    if (rows.length === 0) {
      return res.send("File not found.");
    }

    const file = rows[0];
    const filePath = path.join(__dirname, file.file_path);

    // Serve the file for download
    res.download(filePath, file.file_name, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.send("Error downloading file.");
      }
    });
  } catch (error) {
    console.error("Error downloading file from database:", error);
    res.send("Error downloading file.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//  MySQL Table Setup:
// Create a table Files in your MySQL database (Node_test) to store file information:
// CREATE TABLE Files (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     file_name VARCHAR(255) NOT NULL,
//     file_path VARCHAR(255) NOT NULL
// );

// a. Dependencies and Setup:
// Install mysql2/promise to work with MySQL using async/await:
// npm install mysql2/promise express multer

// The multer.diskStorage() function in the code you shared is used to configure how
// and where files will be stored when uploaded using the Multer middleware in Node.js.

// multer.diskStorage():
// This function configures Multer's storage engine to store files on the disk. It allows you to define two things:

// Destination: Where the file will be saved.
// Filename: What the name of the file will be when stored.

// destination: (req, file, cb):
// destination is a function that determines where to store the uploaded file.
// req: The HTTP request object.
// file: The file object that contains details about the uploaded file (e.g., original name, encoding, mimetype, etc.).
// cb: Callback function that you call once the destination is determined.

// This sets the destination folder to ./uploads (a folder named uploads in the root directory). The first argument (null) indicates no errors, and the second argument specifies the path.

// 3. filename: (req, file, cb):
// filename is a function that determines how the file should be named on the disk.
// It takes the file object and uses the Date.now() function to generate a unique name for the file based on the current timestamp.

// Date.now() generates a unique timestamp to avoid filename collisions (in case multiple files with the same name are uploaded).
// path.extname(file.originalname) extracts the original file extension (e.g., .png, .jpg) from the uploaded file.

// res.download(path [, filename] [, options] [, fn])
// Transfers the file at path as an “attachment”. Typically, browsers will prompt the user for download. By default, the Content-Disposition header “filename=” parameter is derived from the path argument, but can be overridden with the filename parameter. If path is relative, then it will be based on the current working directory of the process or the root option, if provided.

// This API provides access to data on the running file system. Ensure that either (a) the way in which the path argument was constructed is secure if it contains user input or (b) set the root option to the absolute path of a directory to contain access within.

// When the root option is provided, Express will validate that the relative path provided as path will resolve within the given root option.
