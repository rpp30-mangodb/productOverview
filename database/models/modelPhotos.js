const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photosSchema = new Schema({
  'id': Number,
  'style_id': Number,
  'thumbnail_url': String,
  'url': String
});

const Photos = mongoose.model('Photos', photosSchema);
module.exports = Photos;