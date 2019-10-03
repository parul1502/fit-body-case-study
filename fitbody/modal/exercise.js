const mongoose = require('mongoose');
const schema = mongoose.Schema;

const exerciseSchema = new schema({
    exerciseName: [String],
    minutes: String,
    calories_burned: String,
    category:String
  })
  module.exports=mongoose.model('Exercise',exerciseSchema, 'exercises');
