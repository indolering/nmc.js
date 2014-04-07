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
