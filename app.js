const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello, Jenkins!');
});

const server = app.listen(3000, () => {
  console.log('App listening on port 3000');
});

module.exports = server; // Export for testing purposes
