const express = require('express');
const collegeRouter = require('./routes/collegeRoutes')
const studentRouter = require('./routes/studentRoutes')

const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static('public/build'))

app.use('/college',collegeRouter);
app.use('/student', studentRouter);

module.exports = app;