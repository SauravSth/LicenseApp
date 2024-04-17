import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js'
import appointmentController from '../controllers/appointmentController.js'
import checker from '../middlewares/checker.js'
import examinerController from '../controllers/examinerController.js'
import candidateController from '../controllers/candidateController.js'

// Dashboard Route
router.get('/', userController.getDashboard)

// Login / SignUp Routes
router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin)
router.get('/signup', userController.getSignup)
router.post('/signup', userController.postSignup)
router.post('/logout', userController.logout)

// Driver Routes
router.get('/gTest', checker.userTypeDriver, userController.getGTest)
router.post('/gTest', userController.postGTest)
router.get('/g2Test', checker.userTypeDriver, userController.getG2Test)
router.post('/g2Test', userController.postG2Test)
router.get('/testResult', userController.getResults)
router.get('/delete/:_id', userController.getDelete)
// Appointment Routes
router.get(
	'/appointment',
	checker.userTypeAdmin,
	appointmentController.getAppointment
)
router.post('/appointment', appointmentController.postAppointment)
router.get('/getTimeSlots', appointmentController.getTimeSlots)
router.get('/test', examinerController.getTest)

// Candidate Routes for Admin
router.get('/candidate', candidateController.getCandidate)
router.post('/candidate', candidateController.postCandidate)
router.post('/filter', examinerController.postFilter)

// Examiner Routes
router.get('/examiner', examinerController.getExaminer)

export default router
