var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/trafficUS';
MongoClient.connect(url, function(err, db){
  console.log("connected!");
  db.close();
})
