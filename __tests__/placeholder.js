var expect = require('chai').expect;

describe('placeholder test suite', function() {
  it('should concat a beautiful name', function() {
    var beautifulName = (a, b) => a + b;
    expect(beautifulName('aaron', 'fife')).to.equal('aaronfife');
  });
});