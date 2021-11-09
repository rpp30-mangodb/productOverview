const express = require('express');
const db = require('../mongo.js');

const getProductId = (req, res) => {
  const productId = Number(req.params.product_id);

  db.collection('productfeatures').findOne({ id: productId }, (err, productInfo) => {
    if (err) {
      console.log(err);
      res.status(500).send('No data was found');
    } else {
      res.status(200).send(productInfo);
    }
  });
}

module.exports = getProductId;