const express = require("express");
// const { people1 } = require("./data");
const app = express();

app.use(express.urlencoded({ extended: true }));

const people1 = require("./13-router-people");
app.use("/api/people/", people1);

app.listen(5000, () => {
  console.log("server is connected on port 5000!!!!");
});
