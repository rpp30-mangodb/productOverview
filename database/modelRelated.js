const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relatedSchema = new Schema({
  'id': Number,
  'current_product_id': Number,
  'current_relatedProducts': [
    Number
    // ...
  ]
});

const Related = mongoose.model('Related', relatedSchema);
module.exports = Related;