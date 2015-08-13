var chai = require("chai");
var should = chai.should();
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);


var apiKey = 'API_KEY_HERE';

describe('Viney.create()', function() {
  this.timeout(10000);
  it('Should return error with no options', function () {
    var Viney = require('../Viney');
    return Viney.create().should.eventually.be.rejectedWith("Need options");
  });
  it('Should return error with no API key defined', function() {
    var Viney = require('../Viney');
    return Viney.create({}).should.eventually.be.rejectedWith("Need an API key");
  });
  it('Should create with correct details', function() {
    var Viney = require('../Viney');
    return Viney.create({apiKey: apiKey}).should.eventually.equal('API key looks good');
  });
});

describe('Viney.search()', function() {
  this.timeout(20000);
  var Viney = require('../Viney');
  before(function(done) {
    Viney.create({apiKey: apiKey}).then(function(){
      done();
    });
  });
  it('Should do a search for Batman & return 100 results', function(done) {
    Viney.search({'query': 'Batman'})
    .then(function(data){
      console.log(data);
    });
  });
});
