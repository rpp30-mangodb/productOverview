const express = require('express');
const db = require('../mongo.js');

const getProductStyles = (req, res) => {
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
      res.status(200).send(productInfo);
    }
  })
}

module.exports = getProductStyles;