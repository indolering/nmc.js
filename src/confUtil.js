/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict';

var fs = require('fs');
var Promise = require('es6-promise').Promise;

exports.getConfig = function(path){
  return new Promise(function(resolve, reject) {

    path = path || process.cwd() + '/nmc-conf.json';
    parseFile(path, resolve, function() {
      parseFile(findConfig(), resolve, function() {
        console.info('trying default');
           resolve( //if all else fails
             {
               host: 'localhost',
               port: 8334,
               user: '',
               pass: ''
             }
           )
      });
    });

  });
};

function findConfig() {
  switch (process.platform) {
    case 'linux' :
    case 'freebsd':
      return process.env.HOME + '/.namecoin/namecoin.conf';
    case 'darwin':
      return lookup([process.env.HOME + '/.namecoin/namecoin.conf','/Users/' + process.env.USER + '/Library/Application Support/Namecoin/namecoin.conf']);
    case 'win32':
      return lookup(['%APPDATA%\\Roaming\\namecoin\\namecoin.conf','%APPDATA%\\namecoin\\namecoin.conf','C:\\Users\\'+process.env.USER+'\\AppData\\Roaming\\Bitcoin\\bitcoin.conf']);
    default:
      throw new Error(process.platform + ' is not supported');
  }
}

function lookup(paths) {
  for (var i = 0, len = paths.length; i < len; i++) {
    var path = paths[i];
    if (fs.existsSync(path)) {
      return path;
    }
  }
  return null; //else
}

function parseFile(path, resolve, reject){
  if (!path) {
    console.error('no path!')
   reject('no path!');
  } else {
    fs.readFile(path, 'utf8', function(err, data) {
      if (!err) {
        resolve(parse(data));
      } else {
        console.warn('Waring: trying to parse config path ' + err);
        reject();
      }
    });
  }
}

function parse(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    var tempConf = data.split(/\f|\n|\r/);
    var tempJson = {};

    tempConf.forEach(function(line) {
      line = line.split;
      tempJson[line[0]] = line[1];
    });

    var config = {
      host: 'localhost',
      port: 8334,
      user: '',
      pass: ''
    };

    if (tempJson.host) {
      config.host = tempJson.host;
    }
    if (tempJson.rpcport) {
      config.port = tempJson.rpcport;
    }
    if (tempJson.rpcuser) {
      config.user = tempJson.rpcuser;
    }
    if (tempJson.rpcpassword) {
      config.pass = tempJson.rpcpassword;
    }
    if (tempJson.rpcssl === 1) {
      config.ssl = true;
    }
    if (tempJson.rpcsslcertificatechainfile) {
      config.sslCa = fs.readFileSync(tempJson.rpcsslcertificatechainfile);
    }
    var manualKeys = ['host','rpcport','rpcuser','rpcpassword','rpcssl','rpcsslcertificatechainfile'];
    var keys = Object.keys(tempJson);
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      if (manualKeys.indexOf(key) > -1) {
        config[key] = tempJson[key];
      }
    }
    return config;
  }

}