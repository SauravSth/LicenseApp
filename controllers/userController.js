// const user = require('../models/userModel')
import user from '../models/userModel.js'
import bcrypt from 'bcrypt'

class userController {
	static getDashboard = (req, res) => {
		res.render('dashboard', {
			banner: 'Dashboard',
			subheading: 'Your Data Here',
		})
	}
	static getLogin = (req, res) => {
		res.render('Login', { banner: 'Login', subheading: 'Login Here' })
	}
	static getGTest = (req, res) => {
		res.render('gTest', {
			banner: 'G-Test',
			subheading: 'Login for G-Test',
			exists: true,
		})
	}
	static postGTest = async (req, res) => {
		try {
			const data = req.body

			let userData = await user.findOne({ licenseNo: data.licenseno })
			if (userData) {
				res.render('gTest', {
					userData,
					banner: 'G-Test',
					subheading: 'Login for G-Test',
					exists: true,
				})
			} else {
				res.render('gTest', {
					banner: 'G-Test',
					subheading: 'Login for G-Test',
					exists: false,
				})
			}
		} catch (e) {
			console.log(e)
		}
	}
	static getG2Test = (req, res) => {
		res.render('g2Test', {
			banner: 'G2-Test',
			subheading: 'Book your G2-Test Here',
		})
	}
	static postG2Test = async (req, res) => {
		try {
			const data = req.body

			let hashedLicenseNo = bcrypt.hash(data.licenseNo, 10)

			const newUser = new user({
				firstName: data.firstname,
				lastName: data.lastname,
				age: data.age,
				dateOfBirth: data.dob,
				licenseNo: hashedLicenseNo,
				carDetails: {
					make: data.make,
					model: data.model,
					year: data.year,
					plateNo: data.plate,
				},
			})

			await newUser.save()
			res.redirect('gTest')
		} catch (e) {
			console.log(e)
		}
	}
	static getEditDetails = async (req, res) => {
		try {
			const licenseNo = req.params.licenseNo
			const searchFromLicenseNo = await user.findOne({
				licenseNo: licenseNo,
			})

			res.render('editDetails', {
				searchedData: searchFromLicenseNo,
				banner: 'Edit User Car Details',
				subheading: 'Edit your vehicle details',
			})
		} catch (e) {
			console.log(e)
		}
	}
	static postEditDetails = async (req, res) => {
		try {
			const updatedData = req.body
			const licenseToUpdate = req.params.licenseNo
			let update = await user.findOneAndUpdate(
				{ licenseNo: licenseToUpdate },
				{
					$set: {
						carDetails: {
							make: updatedData.make,
							model: updatedData.model,
							year: updatedData.year,
							plateNo: updatedData.plate,
						},
					},
				},
				{ new: true }
			)
			res.redirect('/gTest')
		} catch (e) {
			console.log(e)
		}
	}
	static getDelete = async (req, res) => {
		try {
			const licenseNo = req.params.licenseNo
			await user.findOneAndDelete({ licenseNo })

			res.redirect('/g2Test')
		} catch (e) {
			console.log(e)
		}
	}
}

// module.exports = userController
export default userController
