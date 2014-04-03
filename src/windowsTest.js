/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict';

var fs = require('fs');
var locations = ['%APPDATA%\\Roaming\\namecoin\\namecoin.conf','%APPDATA%\\namecoin\\namecoin.conf','C:\\Users\\'+process.env.USER+'\\AppData\\Roaming\\Bitcoin\\bitcoin.conf'];
//var locations = [process.env.HOME + '/.namecoin/namecoin.conf','/Users/'+ process.env.USER +'/Library/Application Support/Namecoin/namecoin.conf'];
var worked = [];
for (var i = 0, len = locations.length; i < len; i++) {
  var path = locations[i];
  if (fs.existsSync(path)) {
    worked.push(path);
    console.log(i + ': ' + path);
  };
}
return worked;
