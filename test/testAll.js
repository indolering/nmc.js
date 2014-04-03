/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict';

var should = require('chai').should();
var nmcjs = require('src/index');






//function nmc(c) {
//
//  this.client = new namecoind.Client(c);
//
//  var n = this;
//
//  /** Stores responses from nmc.heart.
//   *  @var {Object}
//   */
//  this.pongs = [];
//
//  /** Used to monitor status of Namecoin.
//   *  @member {Object}
//   */
//  this.heart = {
//    ping   : function() {
//    },
//    beat   : function(ping) {
//    },
//    isAlive: function(depth) {
//    }
//  };
//
//  setInterval(n.heart.ping, 1000);
//
//  /**
//   * Prints and then returns list of processes with namecoin in the name.
//   * @returns {Array<Object>}
//   */
//  this.psNamecoinPrint = function() {
//
//  };
//
//  /**
//   * Searches for ANY processes with namecoind in the name.
//   * @returns {boolean}
//   */
//  this.psNamecoind = function() {
//  };
//
//  /**
//   * Returns promise which resolves into info record for passed name.
//   * @returns {(Promise.<number> | Error)}
//   */
//  this.blockCount = function() {
//  };
//
//  /**
//   * JSON object with infromation regarding Namecoind and the blockchain.
//   * @typedef {Object} getInfo
//   * @property {number} version,
//   * @property {number} balance,
//   * @property {number} blocks,
//   * @property {number} timeoffset,
//   * @property {number} connections,
//   * @property {?number} proxy,
//   * @property {boolean} generate,
//   * @property {number} genproclimit,
//   * @property {number} difficulty,
//   * @property {number} hashespersec,
//   * @property {boolean} testnet,
//   * @property {number} keypoololdest,
//   * @property {number} keypoolsize,
//   * @property {number} paytxfee,
//   * @property {number} mininput,
//   * @property {?number} errors,
//   */
//
//  /**
//   * Returns promise which resolves into info record for passed name.
//   * @returns {Promise.<getInfo>}
//   */
//  this.info = function() {
//  };
//
//
//  /**
//   * Returns promise which resolves to a record for passed name.
//   * @param {string} name Name of website
//   * @param {?string} namespace ('d' if blank)
//   * @returns {Promise.<object>}
//   */
//  this.show = function(name, namespace) {
//  };
//
//  /**
//   * Arguments for scan().
//   * @typedef {Object} scan-args
//   * @property {string} name regex,
//   * @property {?string} namespace ('d' if blank),
//   * @property {?number} max (default 500),
//   * */
//
//  /**
//   * Returns promise which resolves to a list of all names which match the Regex.
//   * @param {( string | {scan-args} )} args String name or parameter object.
//   * @returns {Promise.<Array.<Object>>}
//   */
//  this.scan = function(args) {
//  };
//
//  /**
//   * Arguments for filter().
//   * @typedef {Object} filter-args
//   * @property {string} regex,
//   * @property {?number} age,
//   * @property {?number} start,
//   * @property {?number} max,
//   * @property {?boolean} stat
//   * */
//
//  /**
//   * Returns all values whose name matches Regex.
//   * @param {( string | {filter-args} )} args String regex or query parameters.
//   * @returns {Array.<Object>}
//   * TODO: turn namespace (d/) into parameter
//   */
//  this.filter = function(args)
//
//};
//return this;
//}
//
//
///**
// * Configuration Object.
// * @typedef {Object} config
// * @property {?string} host,
// * @property {?number} port,
// * @property {?string} user,
// * @property {?number} port,
// * @property {?boolean} ssl,
// * @property {?boolean} sslStrict,
// * @property {?function(string): string} sslCa,
// * */
///**
// * Initializes connection after searching for config files
// * @param {?(config | string)} config Object with settings.
// * @returns {Promise.<nmc>}
// */
//exports.init = function(config) {
//  new nmc(confUtil.getConfig(config));
//};