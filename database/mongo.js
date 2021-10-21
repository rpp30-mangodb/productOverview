const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductFeatures = require('./modelFeatures.js');
const ProductPhotos = require('./modelPhotos.js');
const ProductList = require('./modelProducts.js');
const RelatedProducts = require('./modelRelated.js');
const ProductSkus = require('./modelSkus.js');
const ProductStyles = require('./modelStyles.js');

mongoose.connect('mongodb://localhost/atelierdb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', () => console.log('atelierdb is connected') );
db.on('error', (err) => console.log('atelierdb has an error:', err) );

module.exports = db;