const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featuresSchema = new Schema({
  'id': Number,
  'product_id': {
    'type': Number,
    'unique': true
  },
  // 'product_list': ProductList,
  'features': [
    {
      'feature': String,
      'value': String
    }
    // ...
  ]
});

const Features = mongoose.model('Features', featuresSchema);
module.exports = Features;