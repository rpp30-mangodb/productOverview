const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-parser')
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost/atelierdb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', (err) => console.log('atelierdb has an error:', err) );
db.once('open', () => {
  console.log('atelierdb is connected');
});


module.exports = db;


/*
    _____ FEATURES _____
    mongoimport --type csv -d atelierdb -c features --headerline --drop /Users/aaronfife/Desktop/HR-RPP30/other/csv/features.csv
    1:08 minutes
    2,219,279 documents

    _____ PHOTOS _____
    mongoimport --type csv -d atelierdb -c photos --headerline --drop /Users/aaronfife/Desktop/HR-RPP30/other/csv/photos-SCRUBD.csv
    Failed: read error on entry #48: line 50, column 6: extraneous " in field
      - had to clean data
    3:08 minutes
    5,655,656 documents

    _____ LISTS _____
    mongoimport --type csv -d atelierdb -c lists --headerline --drop /Users/aaronfife/Desktop/HR-RPP30/other/csv/product.csv
    35.71 seconds
    1,000,011 documents

    _____ RELATEDS _____
    mongoimport --type csv -d atelierdb -c relateds --headerline --drop /Users/aaronfife/Desktop/HR-RPP30/other/csv/related.csv
    2:10 minutes
    4,508,263 documents

    _____ SKUS _____
    mongoimport --type csv -d atelierdb -c skus --headerline --drop /Users/aaronfife/Desktop/HR-RPP30/other/csv/skus.csv
    5:36 minutes
    11,323,917 documents

    _____ STYLES _____
    mongoimport --type csv -d atelierdb -c styles --headerline --drop /Users/aaronfife/Desktop/HR-RPP30/other/csv/styles.csv
    1:01 minutes
    1,958,102 documents



    __________ PRODUCTFEATURES __________
    features + lists
    createIndexes for aggregation
      FEATURES: product_id
      LISTS: id
    1:33 minutes
    1,000,010 documents - missing 1 document?
    createIndex for get requests
      PRODUCTFEATURES: id

      db.features.aggregate([
        {$match:{product_id:1}},
        {$group:{_id:'$product_id',features:{$push:{'feature':'$feature','value':'$value'}}}},
        {$lookup:{from:'lists',localField:'_id',foreignField:'id',as:'aaron'}},
        {$unwind:'$aaron'},
        {$addFields:{'id': '$aaron.id','name': '$aaron.name','slogan': '$aaron.slogan','description': '$aaron.description','category': '$aaron.category','default_price': '$aaron.default_price'}},
        {$project:{'aaron': 0}}
      ]).pretty()

      db.features.aggregate([
        {$match:{product_id:{$gte:1}}},
        {$group:{_id:'$product_id',features:{$push:{'feature':'$feature','value':'$value'}}}},
        {$lookup:{from:'lists',localField:'_id',foreignField:'id',as:'aaron'}},
        {$unwind:'$aaron'},
        {$addFields:{'id': '$aaron.id','name': '$aaron.name','slogan': '$aaron.slogan','description': '$aaron.description','category': '$aaron.category','default_price': '$aaron.default_price'}},
        {$project:{'aaron': 0}},
        {$out:'productfeatures'}
      ],
      {allowDiskUse: true})


    __________ STYLESPHOTOS __________
    styles + photos
    createIndexes for aggregation
      STYLES: id
      PHOTOS: styleId
    2:53 minutes
    1,958,102 documents

      db.styles.aggregate([
        {$match:{productId:14}},
        {$lookup:{from:'photos',localField:'id',foreignField:'styleId',as:'photos'}},
        {$addFields:{'style_id':'$id', 'default?':'$default_style'}},
        {$project:{'photos._id':0, 'photos.id':0, 'photos.styleId':0, 'photos.__v':0, 'id':0, 'default_style':0}}
      ]).pretty()

      db.styles.aggregate([
        {$match:{id:{$gte:1}}},
        {$lookup:{from:'photos',localField:'id',foreignField:'styleId',as:'photos'}},
        {$addFields:{'style_id':'$id', 'default?':'$default_style'}},
        {$project:{'photos._id':0, 'photos.id':0, 'photos.styleId':0, 'photos.__v':0, 'id':0, 'default_style':0}},
        {$out:'stylesphotos'}
      ],
      {allowDiskUse: true})


    __________ STYLESPHOTOSSKUS __________
    stylesphotos + skus
    createIndexes for aggregation
      STYLESPHOTOS: style_id
      SKUS: styleId
    3:14 minutes
    1,958,102 documents

      db.stylesphotos.aggregate([
        {$match:{style_id:14}},
        {$lookup:{from:'skus',localField:'style_id',foreignField:'styleId',as:'skus'}},
        {$addFields:{skus:{$arrayToObject:{$map: {input:'$skus', in:{k: {$toString:'$$this.id'}, v:'$$this'}}}}}}
      ]).pretty()

      db.stylesphotos.aggregate([
        {$match:{style_id:{$gte:1}}},
        {$lookup:{from:'skus',localField:'style_id',foreignField:'styleId',as:'skus'}},
        {$addFields:{skus:{$arrayToObject:{$map: {input:'$skus', in:{k: {$toString:'$$this.id'}, v:'$$this'}}}}}},
        {$out: 'stylesphotosskus'}
      ],
      {allowDiskUse: true})


    __________ PRODUCTSTYLES __________
    stylesphotosskus grouping
    createIndexes for aggregation
      STYLESPHOTOSSKUS: product_id
    1:17 minutes
    800,448 documents
    createIndex for get requests
      PRODUCTSTYLES: product_id

      db.stylesphotosskus.aggregate([
        {$match:{productId:1}},
        {$group:{_id:'$productId', results:{$push:{
          style_id:'$style_id',
          name:'$name',
          original_price:'$original_price',
          sale_price:'$sale_price',
          'default?':'$default?',
          photos:'$photos',
          skus:'$skus'
        }}}},
        {$addFields:{product_id:'$_id'}},
        {$project:{_id:0}}
      ]).pretty()

      db.stylesphotosskus.aggregate([
        {$match:{productId:{$gte:1}}},
        {$group:{_id:'$productId', results:{$push:{
          style_id:'$style_id',
          name:'$name',
          original_price:'$original_price',
          sale_price:'$sale_price',
          'default?':'$default?',
          photos:'$photos',
          skus:'$skus'
        }}}},
        {$addFields:{product_id:'$_id'}},
        {$project:{_id:0}},
        {$out: 'productstyles'}
      ],
      {allowDiskUse: true})


    __________ RELATEDSJOIN __________
    relateds grouping
    createIndexes for aggregation
      RELATEDS: current_product_id & related_product_id
    19.28 seconds
    1,000,009 documents
    createIndex for get requests
      RELATEDSJOIN: product_id

      db.relateds.aggregate([
        {$match:{current_product_id:100}},
        {$group:{_id:'$current_product_id', related_products:{$push:'$related_product_id'}}},
        {$addFields:{product_id:'$_id'}},
        {$project:{_id:0}}
      ]).pretty()

      db.relateds.aggregate([
        {$match:{current_product_id:{$gte:1}}},
        {$group:{_id:'$current_product_id', related_products:{$push:'$related_product_id'}}},
        {$addFields:{product_id:'$_id'}},
        {$project:{_id:0}},
        {$out: 'relatedsjoin'}
      ],
      {allowDiskUse: true})

*/