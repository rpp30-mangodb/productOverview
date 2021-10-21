const ProductList = new Schema({
  'id': Number,
  'name': String,
  'slogan': String,
  'description': String,
  'category': String,
  'default_price': Number
})



const ProductFeatures = new Schema({
  'productListData': ProductList,
  'features': [
    {
      'feature': String,
      'value': String
    }
    //...
  ]
})



const ProductStyles = new Schema({
  'product_id': Number,
  'results': [
    {
      'style_id': Number,
      'name': String,
      'original_price': Number,
      'sale_price': Number,
      'default?': Boolean,
      'photos': [
                  {
                    'thumbnail_url': String,
                    'url': String
                  }
                  //...
                ],
      'skus': {
        type: Map,
        of: new Schema({
          'quantity': Number,
          'size': String
        })
      }
    }
  ]
})



const RelatedProducts = new Schema({
  'product_id': Number,
  'relatedProducts': [Number]
})