const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  'id': Number,
  'name': String,
  'slogan': String,
  'description': String,
  'category': String,
  'default_price': Number,
});

const List = mongoose.model('List', listSchema);
module.exports = List;