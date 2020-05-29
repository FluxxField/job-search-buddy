const debug = require("debug")("server");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../client/public")));

// app.get("/*", (req, res) => {
//   debug(__dirname);
//   res.sendFile(path.join(__dirname, "../client/public/index.html"), (err) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

app.get("/*", (req, res) => {
  debug(req.path);
  res.end();
});

app.listen(PORT, () => debug(`Server is up and running on ${PORT}...`));
