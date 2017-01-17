'use strict';

var admin = require('firebase-admin');
var fs = require('fs');
require('colors');

exports.init = function(databaseURL, serviceAccount) {
   if (!fs.existsSync(serviceAccount)) {
     serviceAccount = {
        "type": "service_account",
        "projectId": process.env.PROJ_ID,
        "privateKeyId": process.env.PROJ_PRIVATE_KEY_ID,
        "privateKey": process.env.PROJ_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "clientEmail": process.env.PROJ_CLIENT_EMAIL,
        "clientId": process.env.PROJ_CLIENT_ID,
        "authUri": process.env.PROJ_AUTH_URI,
        "tokenUri": process.env.PROJ_TOKEN_URI,
        "authProviderX509CertUrl": process.env.PROJ_AUTH_PROVIDER_X509,
        "clientX509CertUrl": process.env.PROJ_CLIENT_X509
     }
   }
  //  console.log(serviceAccount);
   var config = {
     databaseURL: databaseURL,
     credential: admin.credential.cert(serviceAccount)
   };
   console.log(config.credential)
   admin.initializeApp(config)
};

exports.fbRef = function(path) {
   return admin.database().ref().child(path);
};

exports.pathName = function(ref) {
   var p = ref.parent.key;
   return (p? p+'/' : '')+ref.key;
};

exports.isString = function(s) {
  return typeof s === 'string';
};

exports.isObject = function(o) {
  return o && typeof o === 'object';
};

exports.unwrapError = function(err) {
  if( err && typeof err === 'object' ) {
    return err.toString();
  }
  return err;
};

exports.isFunction = function(f) {
  return typeof f === 'function';
};
