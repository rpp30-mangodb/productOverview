var expect = require('chai').expect;
const assert = require("assert");

describe('placeholder test suite', function() {
  it('should concat a beautiful name', function() {
    var beautifulName = (a, b) => a + b;
    expect(beautifulName('aaron', 'fife')).to.equal('aaronfife');
  });
});


const products = require('../database/controllers/products');
describe('make sure products function exists', function() {
  it('should exist', function() {
    const result = products('aaron');
    assert.strictEqual(result, undefined)
  })
})
