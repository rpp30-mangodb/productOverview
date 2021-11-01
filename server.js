const express = require('express');
const cors = require('cors');
const db = require('./database/mongo.js');

const PORT = 9000;
const app = express();
app.use(cors());


app.get('/products', (req, res) => {
  // need to account for a page count???
  db.collection('lists').findOne({ id: 1 }, (err, products) => {
    if (err) {
      console.log(err);
      res.status(500).send('No data was found');
    } else {
      res.status(200).send(products);
    }
  });
});

app.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;
  db.collection('productfeatures').findOne({ id: productId }, (err, productInfo) => {
    if (err) {
      console.log(err);
      res.status(500).send('No data was found');
    } else {
      res.status(200).send(productInfo);
    }
  });
});

app.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  db.collection('productstyles').findOne({ product_id: productId }, (err, productInfo) => {
    if (err) {
      console.log(err);
      res.status(500).send('No data was found');
    } else {
      res.status(200).send(productInfo)
    }
  })
});

app.get('/products/:product_id/related', (req, res) => {
  const productId = req.params.product_id;
  db.collection('relatedsjoin').findOne({ product_id: productId }, (err, productInfo) => {
    if (err) {
      console.log(err);
      res.status(500).send('No data was found');
    } else {
      res.status(200).send(productInfo);
    }
  })
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});



app.listen(PORT, () => console.log(`CORS-enabled server listening on port ${PORT}`) );