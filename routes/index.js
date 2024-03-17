import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js'
import checker from '../middlewares/checker.js'

router.get('/', checker.validUser, userController.getDashboard)
router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin)
router.get('/signup', userController.getSignup)
router.post('/signup', userController.postSignup)
router.post('/logout', userController.logout)
router.get('/gTest', checker.userType, userController.getGTest)
router.post('/gTest', userController.postGTest)
router.get('/g2Test', checker.userType, userController.getG2Test)
router.post('/g2Test', userController.postG2Test)
router.get('/editDetails', userController.getEditDetails)
router.post('/editDetails', userController.postEditDetails)
router.get('/delete/:_id', userController.getDelete)

export default router
