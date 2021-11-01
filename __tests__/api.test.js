const frisby = require('frisby');
const Joi = frisby.Joi;

it('should be a teapot', function () {
  return frisby.get('http://httpbin.org/status/418')
    .expect('status', 418);
});

it ('should return a status of 200 when calling products', function () {
  return frisby
    .get('http://localhost:9000/products')
    .expect('status', 200);
});

it ('should return a status of 200 when calling product information', function () {
  return frisby
    .get('http://localhost:9000/products/1')
    .expect('status', 200);
});

it ('should return a status of 200 when calling product styles', function () {
  return frisby
    .get('http://localhost:9000/products/19/styles')
    .expect('status', 200);
});

it ('should return product styles', function () {
  return frisby
    .get('http://localhost:9000/products/19/styles')
    .expect('bodyContains', ['product_id']);
});

it ('should return a status of 200 when calling related products', function () {
  return frisby
    .get('http://localhost:9000/products/1/related')
    .expect('status', 200);
});