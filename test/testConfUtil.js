/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict';
var confUtil = require('src/confUtil')


describe('Test Config Parse', function(){
  describe('json', function(){
    it('Should have all of the items in nmc.json', function(done){
      var user = new User('Luna');
      user.save(function(err){
        if (err) throw err;
        done();
      });
    })
  })
});

