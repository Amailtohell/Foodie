const mongoose = require('mongoose')
require("dotenv").config();


const url = process.env.MONGODB_CONNECTION_STRING;
const mongoURI = `${url}`;
module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
    if (err) console.log("---" + err);
    else {
      // var database =
      console.log("Connected to MongoDB!");
      const foodCollection = await mongoose.connection.db.collection("sample");
      foodCollection.find({}).toArray(async function (err, data) {
        const categoryCollection = await mongoose.connection.db.collection(
          "FoodCategory" 
        );
        categoryCollection.find({}).toArray(async function (err, Catdata) {
          callback(err, data, Catdata);
        });
      });
    
    }
  });
};
