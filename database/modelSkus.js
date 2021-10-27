const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skusSchema = new Schema({
  'id': String,
  'styleId': Number,
  'size': String,
  'quantity': Number
});

const Skus = mongoose.model('Skus', skusSchema);
module.exports = Skus;