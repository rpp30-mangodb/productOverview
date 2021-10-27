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



/*
    db.features.aggregate([
      {
        $match:
        {
          product_id: {
            $gte: 1
          }
        }
      },
      {
        $group:
          {
            _id: '$product_id',
            features: {
              $push: {
                'feature': '$feature',
                'value': '$value'
              }
            }
          }
      },
      {
        $lookup:
        {
          from: 'lists',
          localField: '_id',
          foreignField: 'id',
          as: 'aaron'
        }
      },
      {
        $unwind: '$aaron'
      },
      {
        $addFields:
        {
          'id': '$aaron.id',
          'name': '$aaron.name',
          'slogan': '$aaron.slogan',
          'description': '$aaron.description',
          'category': '$aaron.category',
          'default_price': '$aaron.default_price'
        }
      },
      {
        $project:
        {
          'aaron': 0
        }
      },
      {
        $out: 'productfeatures'
      }
    ], {allowDiskUse: true})



    db.features.aggregate(
      [
        {$match:{product_id:{$gte:1}}},
        {$group:{_id:'$product_id',features:{$push:{'feature':'$feature','value':'$value'}}}},
        {$lookup:{from:'lists',localField:'_id',foreignField:'id',as:'aaron'}},
        {$unwind:'$aaron'},
        {$addFields:{'id': '$aaron.id','name': '$aaron.name','slogan': '$aaron.slogan','description': '$aaron.description','category': '$aaron.category','default_price': '$aaron.default_price'}},
        {$project:{'aaron': 0}},
        {$out:'productfeatures'}
      ],
      {allowDiskUse: true})
*/