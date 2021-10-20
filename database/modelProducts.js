const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  'id': Number,
  'name': String,
  'slogan': String,
  'description': String,
  'category': String,
  'default_price': Number,
});

const ProductList = mongoose.model('ProductList', productsSchema);
module.exports = ProductList;