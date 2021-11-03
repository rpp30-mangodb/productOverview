const express = require('express');
const db = require('../mongo.js');

const getProductList = (req, res) => {
  let pageCount = Number(req.query.page || 1);
  let resultsPerPage = Number(req.query.count || 5);
  if (pageCount !== 1) {resultsPerPage = resultsPerPage * pageCount};
  let results = [];

  for (let i = 1; i <= resultsPerPage; i++) { results.push(i); }

  db.collection('lists').find({ 'id': {$in: results} }).toArray( (err, products) => {
    if (err) {
      console.log(err);
      res.status(500).send('No data was found');
    } else {
      const results = [];
      if (pageCount !== 1 && pageCount !== 0) {
        for (let i = 1; i <= pageCount; i++) {
          let docsPerPage = resultsPerPage / pageCount;
          results.push(products.splice(0, docsPerPage));
        }
        res.status(200).send(results);
      } else {
        res.status(200).send(products)
      }
    }
  });

}

module.exports = getProductList;