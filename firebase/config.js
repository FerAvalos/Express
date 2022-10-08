
var firebase = require("firebase-admin");

var serviceAccount = require("../key.json");

modules.exports= firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
