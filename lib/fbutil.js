'use strict';

var admin = require('firebase-admin');
var fs = require('fs');
require('colors');

exports.init = function(databaseURL, serviceAccount) {
   if (!fs.existsSync(serviceAccount)) {
     serviceAccount = {
        "type": "service_account",
        "project_id": process.env.PROJ_ID,
        "private_key_id": process.env.PROJ_PRIVATE_KEY_ID,
        "private_key": process.env.PROJ_PRIVATE_KEY,
        "client_email": process.env.PROJ_CLIENT_EMAIL,
        "client_id": process.env.PROJ_CLIENT_ID,
        "auth_uri": process.env.PROJ_AUTH_URI,
        "token_uri": process.env.PROJ_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.PROJ_AUTH_PROVIDER_X509,
        "client_x509_cert_url": process.env.PROJ_CLIENT_X509
     }
   }
  //  console.log(serviceAccount);
   var config = {
     databaseURL: databaseURL,
     credential: admin.credential.cert(serviceAccount)
   };
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
