const mongoose = require('mongoose');
const College = require('./college');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    year: {
        type: Number
    },
    college:{
        type: mongoose.Schema.ObjectId,
        ref: 'College',
    },
    skills:[{
        type:String
    }]
})

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;