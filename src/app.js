const express = require('express');
const artistRouter = require('./routes/artist')

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use('/', artistRouter)

module.exports = app;