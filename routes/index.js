// const express = require('express')
import express from 'express'
const router = express.Router()
// const userController = require('../controllers/userController')
import userController from '../controllers/userController.js'

router.get('/', userController.getDashboard)
router.get('/login', userController.getLogin)
router.get('/gTest', userController.getGTest)
router.post('/gTest', userController.postGTest)
router.get('/g2Test', userController.getG2Test)
router.post('/g2Test', userController.postG2Test)
router.get('/editDetails/:licenseNo', userController.getEditDetails)
router.post('/editDetails/:licenseNo', userController.postEditDetails)
router.get('/delete/:licenseNo', userController.getDelete)

// module.exports = router
export default router
