const express = require('express');
const redis = require('redis');
const cors = require('cors');
const db = require('./database/mongo.js');
const getProductList = require('./database/controllers/products');
const getProductId = require('./database/controllers/product_id');
const getProductStyles = require('./database/controllers/stylesCopy');
const getProductRelateds = require('./database/controllers/relateds');
const config = require('./config.js');
const app = express();

app.use(cors());


const { server: { HOST, PORT } } = config;


app.get('/products', (req, res) => { getProductList(req, res); });

app.get('/products/:product_id', (req, res) => { getProductId(req, res); });

app.get('/products/:product_id/styles', (req, res) => { getProductStyles(req, res); });

app.get('/products/:product_id/related', (req, res) => { getProductRelateds(req, res); });

//loaderio
app.get('*/loaderio*', (req, res) => {
  const loaderToken = 'loaderio-f761dbbb3fb6c9f8e51f36c85295b18d'
  res.status(200).send(loaderToken);
})


app.listen(PORT, () => console.log(`CORS-enabled server listening on port ${PORT}`) );