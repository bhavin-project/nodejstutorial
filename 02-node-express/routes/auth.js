const express = require("express");
const router = express.Router();
let { people } = require("../data");

router.post("/", (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: "Name and Id is required" });
  }
  const idMatch = people.find((person) => person.id === id);
  if (idMatch) {
    res.status(200).json({ message: "Login Successfull!!!" });
  } else {
    res.status(401).json({ message: "Invalid username or password!!" });
  }
});
module.exports = router;
