const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photosSchema = new Schema({
  'id': Number,
  'style_id': Number,
  'results': {
    'thumbnail_url': String,
    'url': String
  }
});

const ProductPhotos = mongoose.model('ProductPhotos', photosSchema);
module.exports = ProductPhotos;