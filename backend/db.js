const mongoose = require("mongoose");

const url =
  "mongodb+srv://viraj308:VIRAJCHAVAN308@cluster0.zjuxe9v.mongodb.net/SaucyFood?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(url);
  console.log("connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  const fetchedData = await mongoose.connection.db.collection("FoodList");

  fetchedData
    .find()
    .toArray()
    .then((data) => {
      /* console.log(data); */
      global.food_items = data;
    })
    .catch((err) => {
      console.log(err);
    });

  const fetchedData2 = await mongoose.connection.db.collection("FoodCategory");

  fetchedData2
    .find()
    .toArray()
    .then((data) => {
      global.foodCategory = data;
    });
}
module.exports = main;
