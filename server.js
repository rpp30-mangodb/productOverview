const express = require('express');
const cors = require('cors');
const db = require('./database/mongo.js');
const getProductList = require('./database/controllers/products');
const getProductId = require('./database/controllers/product_id');
const getProductStyles = require('./database/controllers/styles');
const getProductRelateds = require('./database/controllers/relateds');

const PORT = 9000;
const app = express();
app.use(cors());


app.get('/products', (req, res) => { getProductList(req, res); });

app.get('/products/:product_id', (req, res) => { getProductId(req, res); });

app.get('/products/:product_id/styles', (req, res) => { getProductStyles(req, res); });

app.get('/products/:product_id/related', (req, res) => { getProductRelateds(req, res); });




app.listen(PORT, () => console.log(`CORS-enabled server listening on port ${PORT}`) );