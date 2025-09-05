const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve HTML + JS

// Endpoint to save data
app.post("/save", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const data = `
===== User Submission =====
Name: ${req.body.name}
Email: ${req.body.email}
Browser: ${req.body.browser}
OS: ${req.body.os}
Language: ${req.body.language}
Cookies Enabled: ${req.body.cookiesEnabled}
CPU Cores: ${req.body.cpu}
Device Memory: ${req.body.memory} GB
Touch Support: ${req.body.touch}
Pointer: ${req.body.pointer}
Screen: ${req.body.screen}
Viewport: ${req.body.viewport}
Online: ${req.body.online}
Timezone: ${req.body.timezone}
Connection: ${JSON.stringify(req.body.connection)}
Battery: ${JSON.stringify(req.body.battery)}
Clicks: ${req.body.clicks.length} positions recorded
Mouse Movements: ${req.body.mouseMoves.length} positions recorded
Scroll Positions: ${req.body.scrolls.length}
Key Presses: ${req.body.keyPresses.join(", ")}
IP: ${ip}
===========================
`;
  fs.appendFile("userdata.txt", data, (err) => {
    if (err) console.log(err);
  });
  res.send("✅ Data saved!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
