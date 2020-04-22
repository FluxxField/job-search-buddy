const debug = require("debug")("server");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../client/public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => debug(`Server is up and running on ${PORT}...`));
