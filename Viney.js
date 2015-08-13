var Q = require('q');
var request = require('request');
var URI = require('uriJS');

var Viney = {
  clearURI: function(){
    this.uri = new URI("http://www.comicvine.com/api/");
    this.uri.addQuery({"api_key": this.apiKey, "format": "json"});
  },
  search: function(query, callback){
    var deferred = Q.defer();

    this.clearURI();
    this.uri.pathname("/api/search");
    this.uri.addQuery(query);

    console.log(this.uri.toString());

    request(this.uri.toString(), function(error, response, body){
      if(error) {
        deferred.reject(error);
      }
      else{
        body = JSON.parse(body);
        if(body.error == "OK")
          deferred.resolve("API key looks good");
        else
          deferred.resolve(body.error);
      }
    });

    deferred.promise.nodeify(callback);
    return deferred.promise;
  },
  create: function(opts, callback){
    var deferred = Q.defer();

    if(!opts)
      deferred.reject('Need options');
    else
      if(!opts.apiKey)
        deferred.reject('Need an API key');
      else
      {
        this.apiKey = opts.apiKey;

        this.search({"query": "batman", "limit": "1"})
        .then(function(result){
          deferred.resolve(result);
        })
        .fail(function(error){
          deferred.reject(error);
        });
      }

    deferred.promise.nodeify(callback);
    return deferred.promise;
  }
};

module.exports = Viney;
