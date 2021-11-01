const express = require('express');
const db = require('../mongo.js');

const getProductList = (req, res) => {
  // need to change this to by default, grab the first 5 products

  db.collection('lists').findOne({ id: 1 }, (err, products) => {
    if (err) {
      console.log(err);
      res.status(500).send('No data was found');
    } else {
      res.status(200).send(products);
    }
  });
}

module.exports = getProductList;