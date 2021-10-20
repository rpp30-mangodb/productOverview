const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featuresSchema = new Schema({
  'id': Number,
  'product_id': Number, // <-- this links to ProductList id
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



// const feature = new ProductFeatures({
//   product_id: 47430,
//   features: [
//     {
//       feature: 'aaron',
//       value: 'fife'
//     }
//   ]
// })

// feature.save();