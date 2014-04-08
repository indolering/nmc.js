/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict'


var fs = require("fs");

var  Promise = require('es6-promise').Promise,
  namecoind = require('namecoin'),
  ps = require('ps-node');
var sugar = require('sugar');
Object.extend();

var DEBUG = true;


function nmc(conf, resolve, reject) {

  try {
    this.client = initConnection(conf);
  } catch (e) {
    reject(e);
  }

  var n = this;

  /** Stores responses from nmc.heart.
   *  @var {Object}
   */
  this.pongs = [];

  /** Used to monitor status of Namecoin.
   *  @member {Object}
   */
  this.heart = {
    ping   : function() {
      n.heart.beat(n.blockCount().then(
        function(result) {
          return true;
        },
        function(error) {
          return false;
        }));
    },
    beat   : function(ping) {
      n.pongs.shift(ping);
      n.pongs = n.pongs.slice(0, 300); //removes anything older than 5 minutes
    },
    isAlive: function(depth) {
      depth = depth || 100;  //default HTTP timeout
      return n.pongs.slice(0, depth).indexOf(true) > -1;
    }
  };

  setInterval(n.heart.ping, 1000);

  /**
   * Prints and then returns list of processes with namecoin in the name.
   * @returns {Array<Object>}
   */
  this.psNamecoinPrint = function() {
    ps.lookup({
      command: 'namecoin'
    }, function(err, resultList) {
      if (err) {
        throw new Error(err);
      }

      resultList.forEach(function(process) {
        if (process) {

          console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
        }
      });

      return resultList;
    });
  };

  /**
   * Searches for ANY processes with namecoind in the name.
   * @returns {boolean}
   */
  this.psNamecoind = function() {
    ps.lookup({
      command: 'namecoind'
    }, function(err, resultList) {
      if (err) {
        throw new Error(err);
      }

      return resultList.some(function(process) {
        return process.command === "namecoind";
      });

    });
  };

  /**
   * Returns promise which resolves into info record for passed name.
   * @returns {(Promise.<number> | Error)}
   */
  this.blockCount = function() {
    return new Promise(function(resolve, reject) {
      //      that.client.getBlockCount(function(err, value) {

      n.client.getBlockCount(function(err, value) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(value);
          resolve(value.toNumber());
        }
      });
    });
  };

  /**
   * JSON object with infromation regarding Namecoind and the blockchain.
   * @typedef {Object} getInfo
   * @property {number} version,
   * @property {number} balance,
   * @property {number} blocks,
   * @property {number} timeoffset,
   * @property {number} connections,
   * @property {?number} proxy,
   * @property {boolean} generate,
   * @property {number} genproclimit,
   * @property {number} difficulty,
   * @property {number} hashespersec,
   * @property {boolean} testnet,
   * @property {number} keypoololdest,
   * @property {number} keypoolsize,
   * @property {number} paytxfee,
   * @property {number} mininput,
   * @property {?number} errors,
   */

  /**
   * Returns promise which resolves into info record for passed name.
   * @returns {Promise.<getInfo>}
   */
  this.info = function() {

    return new Promise(function(resolve, reject) {
      n.client.getInfo(function(err, value) {
        if (err)
          reject(err);
        else
          resolve(value);
      });
    });
  };


  /**
   * Returns promise which resolves to a record for passed name.
   * @param {string} name Name of website
   * @param {?string} namespace ('d' if blank)
   * @returns {Promise.<object>}
   */
  this.show = function(name, namespace) {
    namespace = namespace || 'd';

    return new Promise(function(resolve, reject) {
      n.client.name_show(namespace + '/' + name, function(err, value) {
        if (err)
          reject(err);
        else
          resolve(value);
      });
    });
  };

  /**
   * Arguments for scan().
   * @typedef {Object} scan-args
   * @property {string} name regex,
   * @property {?string} namespace ('d' if blank),
   * @property {?number} max (default 500),
   * */

  /**
   * Returns promise which resolves to a list of all names which match the Regex.
   * @param {( string | {scan-args} )} args String name or parameter object.
   * @returns {Promise.<Array.<Object>>}
   */
  this.scan = function(args) {
    args = args || '';
    if (typeof args === 'string') {
      args = {'name': args};
    }
    args['namespace'] = args['namespace'] || 'd';
    args['max'] = args['max'] || 500;


    return new Promise(function(resolve, reject) {
      n.client.name_scan(
          args.namespace + '/' +
          args.name + ' ' +
          args.max,
        function(err, value) {
          if (err)
            reject(err);
          else
            resolve(value);
        });
    });
  };

  /**
   * Arguments for filter().
   * @typedef {Object} filter-args
   * @property {string} regex,
   * @property {?number} age,
   * @property {?number} start,
   * @property {?number} max,
   * @property {?boolean} stat
   * */

  /**
   * Returns all values whose name matches Regex.
   * @param {( string | {filter-args} )} args String regex or query parameters.
   * @returns {Array.<Object>}
   * TODO: turn namespace (d/) into parameter
   */
  this.filter = function(args) {
    args = args || '^d/';
    if (typeof args === 'string') {
      args = {'regex': args};
    }

    args.age = args.age || 36000;
    args.start = args.start || 0;
    args.max = args.max || 0;
    args.stat = args.stat || false;

    var query = [args.regex, args.age, args.start, args.max];


    //NOTE falsy check @ init, 'true' input COULD be 'stat' or 'hamburger'
    //check for (not false) and enter in 'stat'!
    if (args.stat !== false) {
      query.push('stat');
    }

    return new Promise(function(resolve, reject) {
      //Note that jsonrpc was modified and it looks for this specific
      //query, you cannot replace with generic jsonrpc w/out that mod.

      n.client.name_filter(query, function(err, value) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(value);
          }
        }
      );
    });

  };
  n.blockCount()
    .then(function() {
      resolve(n);
  }).catch(function() {
      reject(new Error("Namcoin did not respond to BlockCount"));
  })
}

function initConnection(conf) {

  conf.host = conf.host || '127.0.0.1';
  conf.port = conf.port || 8336;
  conf.user = conf.user || process.env.user;
  conf.pass = conf.pass || '';

  var connection = new namecoind.Client(conf);

  return connection;
}


/**
 * Configuration Object.
 * @typedef {Object} config
 * @property {?string} host,
 * @property {?number} port,
 * @property {?string} user,
 * @property {?number} port,
 * @property {?boolean} ssl,
 * @property {?boolean} sslStrict,
 * @property {?function(string): string} sslCa,
 * */
/**
 * Initializes connection after searching for config files
 * @param {config} config Object with settings.
 * @param {function} resolve Continuation callback.
 * @param {function} reject Reject callback.
 * @returns {(Promise.<nmc> | nmc)}
 */
exports.init = function(conf){
  return new Promise(function(resolve, reject) {
    new nmc(conf, resolve, reject);
  });
};
/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict';

var sugar = require('sugar');
Object.extend();


/**
 * Takes raw name and converts it to a JSON record.
 * @param {( string | {filter-args} )} args String regex or query parameters.
 * @returns {Array.<Object>}
 * TODO: turn namespace (d/) into parameter
 */
exports.cleanRecord = function(record) {
  var name = record.name;
  var value = record.value;

  if (name.startsWith('d/')) {
    name = name.from(2);
  }

  if (value === "RESERVED") {
    value = '{"$reserved":true}';
  }

  if (!value.isBlank() && value.has(/[{}:]/)) { //sanity check to reduce error log
    try {
      value = JSON.parse(value);
      value['expires'] = expireBlock(record.expires_in);

    } catch (e) {
//      value = {'$error' : encodeURI(value)};
//      console.log(e, name, value);
      return false;
    }
  } else {
    return false;
  }
  return {name: name, value: value};
}

// removes all admins stuff
// will (eventually) also remove all key/values which are not well formed.
exports.scrubRecord = function(record) {
  if (!record.value.isObject()) {
    record = cleanRecord(record);
  }

  if (record) {
    var keys = Object.keys(record.value);


    for (var i = 0; i < keys.length; i++) {
      if (keys[i].startsWith('_') || keys[i].startsWith('$')) {
        delete record[keys[i]];
      }
    }
  }
  return record;
};
