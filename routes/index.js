const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getDashboard)
router.get('/login', userController.getLogin)
router.get('/gTest', userController.getGTest)
router.post('/gTest', userController.postGTest)
router.get('/g2Test', userController.getG2Test)
router.post('/g2Test', userController.postG2Test)
router.get('/editDetails/:licenseNo', userController.getEditDetails)
router.post('/editDetails/:licenseNo', userController.postEditDetails)
router.get('/delete/:licenseNo', userController.getDelete)

module.exports = router
