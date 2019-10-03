const Exercise = require('../model/exercise');
const Profile = require('../model/profile');
const Food = require('../model/food');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const fitbodySchema = new schema({
      UserProfile: [Profile],
      Food: [Food],
      Exercise: [Exercise]
})
module.exports=mongoose.model('Fitbody', fitbodySchema);
