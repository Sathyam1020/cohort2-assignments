const express = require("express")
const router = express.Router()

const {signup, signin} = require('../controllers/adminAuth');
const {createCourse, getAllCourses} = require('../controllers/adminCourse');

const {adminMiddleware} = require('../middleware/admin');

router.post('/signup', signup);
router.post('/signin', signin);

router.post('/create-course', adminMiddleware, createCourse);
router.get('/all-courses', adminMiddleware, getAllCourses);

module.exports = router