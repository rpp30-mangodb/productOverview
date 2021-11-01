const List = new Schema({
  'id': Number,
  'name': String,
  'slogan': String,
  'description': String,
  'category': String,
  'default_price': Number,
  'campus': 'hr-rpp', // <-- is this needed? not part of csv data
  'created_at': Date, // <-- is this needed? not part of csv data
  'updated_at': Date  // <-- is this needed? not part of csv data
})



const Features = new Schema({
  'id': Number,
  'product_id': Number, // <-- this links to ProductList id
  'product_list': List,
  'features': [
    {
      'feature': String,
      'value': String
    }
    // ...
  ]
})



const Photos = new Schema({
  'id': Number,
  'style_id': Number,
  'results': {
    'thumbnail_url': String,
    'url': String
  }
})



const Skus = new Schema({
  'id': Number,
  'style_id': Number,
  'results': {
    'quantity': Number,
    'size': String
  }
})



const Styles = new Schema({
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
        Photos.results
        // ...
      ],
      'skus': {
        `${Skus.sku_id}`: {
          Skus.results
        }
        // ...
      }
    }
  ]
})



const Related = new Schema({
  'id': Number,
  'current_product_id': Number,
  'current_relatedProducts': [
    Number
    // ...
  ]
})