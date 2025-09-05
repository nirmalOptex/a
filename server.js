const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post("/save", (req, res) => {
  const userData = `Name: ${req.body.name}, Email: ${req.body.email}\n`;

  fs.appendFile("userdata.txt", userData, (err) => {
    if (err) throw err;
    console.log("Data saved!");
  });

  res.send("✅ Your data has been saved!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
