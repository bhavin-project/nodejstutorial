const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// do with and without
const people1 = require("./13-router-people");
app.use("/api/people/", people1);

app.listen(5000, () => {
  console.log("server is connected on port 5000!!!!");
});
