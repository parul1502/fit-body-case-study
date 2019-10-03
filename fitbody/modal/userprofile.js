const mongoose = require('mongoose');
const schema = mongoose.Schema;

const profileSchema = new schema({
        email: String,
        password: String,
        firstName: String,
        LastName: String,
        Gender: String,
        foodeaten: [{
                date: String,
               foods:[ {
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
               }]
        }],
        exerciseDone: [{
                date: String,
               exercises:[ {
                        exerciseName: [String],
            minutes: String,
            calories_burned: String,
            category:String
                }]
        }],
        Birthday: String,
        Height: Number,
        Activity: String,
        Weight: Number,
        BMI: String,
        calories: Number,
        points: String
})
module.exports=mongoose.model('Profile', profileSchema, 'userprofiles');
