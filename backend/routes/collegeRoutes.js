const express = require('express');
const collegeController = require('./../controllers/collegeContoller')

const router = express.Router();

router.route('/').post(collegeController.collegeDetail)
router.route('/similar').post(collegeController.getSimilar)
router.route('/courses').get(collegeController.dashCourse)
router.route('/states').get(collegeController.dashState)
router.route('/insert').post(collegeController.all)
router.route('/all').get(collegeController.allCollege)
router.route('/acourses').post(collegeController.courses)
router.route('/astates').post(collegeController.states)

module.exports = router