const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Features = require('./modelFeatures.js');
const Photos = require('./modelPhotos.js');
const List = require('./modelProducts.js');
const Related = require('./modelRelated.js');
const Skus = require('./modelSkus.js');
const Styles = require('./modelStyles.js');

mongoose.connect('mongodb://localhost/atelierdb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', () => console.log('atelierdb is connected') );
db.on('error', (err) => console.log('atelierdb has an error:', err) );

module.exports = db;