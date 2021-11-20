const express = require('express');
const db = require('../mongo.js');
const redis = require('redis');

const client = redis.createClient(6379);

client.on("error", (error) => {
  console.error(error);
});

const getProductStyles = (req, res) => {
  try {
    const productId = Number(req.params.product_id);

    // Check the redis store for the data first
    client.get(productId, async (err, productStylesData) => {
      if (productStylesData) {
        console.log('i am being cached :)')
        return res.status(200).send({
          error: false,
          message: `productStylesData for ${productId} from the cache`,
          data: JSON.parse(productStylesData)
        })
      } else { // When the data is not found in the cache then we can make request to the database
        const productId = Number(req.params.product_id);

        db.collection('productstyles').findOne({ product_id: productId }, (err, productInfo) => {
          if (err) {
            console.log(err);
            res.status(500).send('No data was found');
          } else {
            if (productInfo === null) {
              productInfo = {
                product_id: productId,
                results: [],
                skus: {}
              }
            }
            // save the record in the cache for subsequent request
            client.setex(productId, 1440, JSON.stringify(productInfo));
            res.status(200).send({
              error: false,
              message: `productStylesData for ${productInfo} from the server`,
              data: productInfo
            });
          }
        })
      }
    })
  } catch (error) {
      console.log(error)
  }
}

module.exports = getProductStyles;