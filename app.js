const express = require('express');
const nameRouter = require('./nameRouter');

const app = express();

app.use(express.json());
app.use('/items', nameRouter())

app.listen('3000', () => {
  console.log("listening on port 3000")
})


module.exports = app;