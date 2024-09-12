const express = require("express");
const app = express();

//  req => middleware => res

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

app.get("/", logger, (req, res) => {
  res.send("Home");
});
app.get("/about", logger, (req, res) => {
  res.send("About");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

// const express = require("express");
// const app = express();

// //  req => middleware => res

// app.use((req, res, next) => {
//   const method = req.method;
//   const url = req.url;
//   const time = new Date().getFullYear();
//   console.log(method, url, time);
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Home");
// });
// app.get("/about", (req, res) => {
//   res.send("About");
// });

// app.listen(5000, () => {
//   console.log("Server is listening on port 5000....");
// });

// const express = require("express");
// const app = express();
// const port = 3000;

// // Application-level middleware
// app.use((req, res) => {
//   console.log(`${req.method} ${req.url}`);
//   // next();
// });

// // Router-level middleware
// app.get("/hello", (req, res) => {
//   res.send("Hello, World!");?
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
