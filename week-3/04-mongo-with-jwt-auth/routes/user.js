const express = require("express")
const router = express.Router()

const {signup, signin} = require('../controllers/userAuth');
const {createCourse, getAllCourses} = require('../controllers/adminCourse');

const {userMiddleware} = require('../middleware/user');

router.post('/signup', signup);
router.post('/signin', signin);

router.get('/all-courses', userMiddleware, getAllCourses);

module.exports = router