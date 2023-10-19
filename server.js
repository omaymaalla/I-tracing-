const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

require('dotenv').config(); // Getting the .env file

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "public")));

// auth_config.json is uselless as we use dotenv instead
app.get("/auth_config.json", (req, res) => {
  //res.sendFile(join(__dirname, "auth_config.json"));
  const responseBody = {
    "domain": process.env.domain,
    "clientId": process.env.clientId
  }
  res.send(responseBody);
});


app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

process.on("SIGINT", function() {
  process.exit();
});

module.exports = app;
