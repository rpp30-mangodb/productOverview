const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductPhotos = require('./modelPhotos.js')
const ProductSkus = require('./modelSkus.js')


const stylesSchema = new Schema({
  'id': Number, // <-- this will link to Photos & Skus style_id
  'product_id': Number,
  'results': [
    {
      'style_id': Number, // <-- this equals the above id? not in csv file but in api
      'name': String,
      'original_price': Number,
      'sale_price': Number,
      'default?': Boolean, // <-- this key = dafault_style in csv file vs default? api
      'photos': [
        ProductPhotos.results
        // ...
      ],
      'skus': {
        `${ProductSkus.sku_id}`: {
          ProductSkus.results
        }
        // ...
      }
    }
  ]
});

const ProductStyles = mongoose.model('ProductStyles', stylesSchema);
module.exports = ProductStyles;