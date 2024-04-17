import user from '../models/userModel.js'
import appointment from '../models/appointmentModel.js'
import bcrypt from 'bcrypt'

class userController {
	static getDashboard = (req, res) => {
		let msg = req.session.message
		delete req.session.message

		res.render('dashboard', {
			banner: 'Dashboard',
			subheading: msg,
		})
	}
	static getLogin = (req, res) => {
		let msg = req.session.message
		delete req.session.message

		res.render('Login', {
			banner: 'Login',
			subheading: msg,
		})
	}
	static postLogin = async (req, res) => {
		try {
			const data = req.body

			const userData = await user.findOne({ username: data.username })
			if (userData) {
				const isMatched = await bcrypt.compare(
					data.password,
					userData.password
				)
				if (isMatched) {
					req.session.userData = userData
					req.session.loggedIn = true
					req.session.message = 'Logged in successfully'
					res.redirect('/')
				} else {
					req.session.message =
						'The password was not correct. Please try again.'
					res.redirect('/login')
				}
			} else {
				req.session.message =
					'User does not exist. Sign Up first to Login.'
				res.redirect('/signup')
			}
		} catch (e) {
			console.log('Login Error')
		}
	}
	static getSignup = (req, res) => {
		let msg = req.session.message
		delete req.session.message

		res.render('signup', {
			banner: 'Signup',
			subheading: msg,
		})
	}
	static postSignup = async (req, res) => {
		try {
			const data = req.body
			const checkExistingUser = await user.findOne({
				username: data.username,
			})

			if (checkExistingUser) {
				req.session.message =
					'This username already exists. Please enter another username.'
				return res.redirect('/signup')
			}
			const hashedPassword = await bcrypt.hash(data.password, 10)

			const newUser = new user({
				username: data.username,
				password: hashedPassword,
				userType: data.usertype,
			})

			await newUser.save()
			res.redirect('/login')
		} catch (e) {
			console.log(e)
		}
	}
	static getGTest = async (req, res) => {
		let msg = req.session.message
		delete req.session.message

		const userData = await user
			.findOne({ _id: req.session.userData._id })
			.populate('appointment')

		if (userData.licenseNo == 'DEFAULT') {
			req.session.message = 'Please fill the G2 form first'
			return res.redirect('/g2Test')
		}

		res.render('gTest', {
			searchedData: userData,
			banner: 'G-Test Page',
			subheading: msg || 'Your Test Details',
		})
	}
	static postGTest = async (req, res) => {
		try {
			const updatedData = req.body

			let update = await user.findOneAndUpdate(
				{ _id: req.session.userData._id },
				{
					$set: {
						testType: "g",
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

			req.session.userData = update
			req.session.message = 'Data has successfully updated'
			res.redirect('/gTest')
		} catch (e) {
			console.log(e)
		}
	}
	static getG2Test = async (req, res) => {
		if (
			req.session.userData.licenseNo == 'DEFAULT' ||
			req.session.userData.licenseNo == null
		) {
			const msg = req.session.message
			delete req.session.message
			res.render('g2Test', {
				banner: 'G2-Test',
				subheading: msg || 'Book your G2-Test Here',
				userType: req.session.userData.userType,
			})
		} else {
			req.session.message = 'Your Details Here.'
			res.redirect('/gTest')
		}
	}
	static postG2Test = async (req, res) => {
		try {
			const data = req.body
			const appointmentData = await appointment.findOne({
				date: data.appointmentDate,
				time: data.appointmentTime,
			})

			let hashedLicenseNo = await bcrypt.hash(data.licenseno, 10)

			let currentUserData = await user.findOneAndUpdate(
				{ _id: req.session.userData._id },
				{
					$set: {
						username: req.session.userData.username,
						password: req.session.userData.password,
						userType: req.session.userData.userType,
						firstName: data.firstname,
						lastName: data.lastname,
						age: data.age,
						dateOfBirth: data.dob,
						licenseNo: hashedLicenseNo,
						testType: "g2",
						carDetails: {
							make: data.make,
							model: data.model,
							year: data.year,
							plateNo: data.plate,
						},
						appointment: appointmentData._id,
					},
				},
				{ new: true }
			)
			await appointment.findOneAndUpdate(
				{ _id: appointmentData._id },
				{
					$set: {
						isAvailable: false,
					},
				},
				{ new: true }
			)
			req.session.userData = currentUserData
			req.session.message = 'Data has been updated successfully.'
			res.redirect('/gTest')
		} catch (e) {
			console.log(e)
		}
	}

	static getDelete = async (req, res) => {
		try {
			await user.findOneAndDelete({ _id: req.session.userData._id })
			delete req.session.userData
			delete req.session.loggedIn
			res.redirect('/')
		} catch (e) {
			console.log(e)
		}
	}
	static logout = (req, res) => {
		req.session.destroy((err) => {
			if (err) {
				throw err
			} else {
				res.redirect('/login')
			}
		})
	}
	static getResults = (req, res) => {
		res.render('result', { banner: 'Test Results', subheading: '' ?? msg })
	}
}

export default userController
