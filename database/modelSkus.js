const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skusSchema = new Schema({
  'id': Number,
  'style_id': Number,
  'results': {
    'quantity': Number,
    'size': String
  }
});

const Skus = mongoose.model('Skus', skusSchema);
module.exports = Skus;