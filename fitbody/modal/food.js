const mongoose = require('mongoose');
const schema = mongoose.Schema;

const foodSchema = new schema({
    foodName: String,
    ServingSize: [String],
    Calories: Number,
    Fat: Number,
    SaturatedFat: Number,
    Sodium: Number,
    Carbohydrates: Number,
    Fiber: Number,
    Sugar: Number,
    Protein: Number,
    Points: String
  })
  module.exports=mongoose.model('Food', foodSchema, 'foods');