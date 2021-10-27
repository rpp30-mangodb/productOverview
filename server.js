const express = require('express');
const cors = require('cors');
const db = require('./database/mongo.js');

const PORT = 9000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.listen(PORT, () => console.log(`CORS-enabled server listening on port ${PORT}`) );