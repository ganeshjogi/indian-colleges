const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    year: {
        type: Number
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country:{
        type: String,
    },
    count:{
        type: Number,
    },
    courses:[{
        type:String
    }]
})
/*collegeSchema.virtual('students', {
    ref: 'Student',
    foreignField: 'college',
    localField: '_id'
  });*/
const College = mongoose.model('College',collegeSchema);

module.exports = College;