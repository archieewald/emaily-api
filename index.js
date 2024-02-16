const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
  res.send({ hi: "there" });
});

app.listen(PORT);

console.log(`App is running at: http://localhost:${PORT}`);
