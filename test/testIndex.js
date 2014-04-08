/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict';
var nmc = null;
var should = require('chai').should();
//var Namecoin = require('../src/index');
var namecoin = require('namecoin');
var conf = {
  hohost: 'localhost',st: 'localhost',
  port: 8336,
  user: 'indolering',
  pass: 'indopassword'
}
var nmcd = new namecoin.Client(conf);

var count = nmcd.cmd("getinfo", function(err,resp) {
  console.log("manual getinfo", err, resp);
});
var info = nmcd.getInfo(function(err,resp) {
  console.log(err,resp);
});
function initConnection(conf) {
  conf = conf || {};

  conf.host = conf.host || 'localhost';
  conf.port = conf.port || 8336;
  conf.user = conf.user || "indolering";
  conf.pass = conf.pass || "indopassword";

  var connection = new namecoin.Client(conf);

  return connection;
}