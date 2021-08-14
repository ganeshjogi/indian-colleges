const express = require('express');
const studentController = require('./../controllers/studentController')

const router = express.Router();

router.route('/college').post(studentController.collegeStudent);
router.route('/all').post(studentController.all);

module.exports = router