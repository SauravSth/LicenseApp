import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js'
import checker from '../middlewares/checker.js'

router.get('/', userController.getDashboard)
router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin)
router.get('/signup', userController.getSignup)
router.post('/signup', userController.postSignup)
router.post('/logout', userController.logout)
router.get('/gTest', checker.userTypeDriver, userController.getGTest)
router.post('/gTest', userController.postGTest)
router.get('/g2Test', checker.userTypeDriver, userController.getG2Test)
router.post('/g2Test', userController.postG2Test)
router.get('/delete/:_id', userController.getDelete)
router.get('/appointment', checker.userTypeAdmin, userController.getAppointment)

export default router
