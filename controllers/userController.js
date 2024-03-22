import user from '../models/userModel.js'
import bcrypt from 'bcrypt'

class userController {
	static getDashboard = (req, res) => {
		let msg = req.session.dashboardMessage
		delete req.session.dashboardMessage
		res.render('dashboard', {
			banner: 'Dashboard',
			subheading: msg,
			loggedIn: req.session.loggedIn,
			userData: req.session.userData,
		})
	}
	static getLogin = (req, res) => {
		let msg = req.session.incorrectPasswordMessage
		delete req.session.incorrectPasswordMessage

		res.render('Login', {
			banner: 'Login',
			subheading: msg,
			loggedIn: req.session.loggedIn,
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
					req.session.dashboardMessage = 'Logged in successfully'
					res.redirect('/')
				} else {
					req.session.incorrectPasswordMessage =
						'The password was not correct. Please try again.'
					res.redirect('/login')
				}
			} else {
				req.session.errorMessage =
					'User does not exist. Sign Up first to Login.'
				res.redirect('/signup')
			}
		} catch (e) {
			console.log('Login Error')
		}
	}
	static getSignup = (req, res) => {
		let msg = req.session.errorMessage
		delete req.session.errorMessage

		res.render('signup', {
			banner: 'Signup',
			subheading: msg,
			loggedIn: req.session.loggedIn,
		})
	}
	static postSignup = async (req, res) => {
		try {
			const data = req.body
			const checkExistingUser = await user.findOne({
				username: data.username,
			})

			if (checkExistingUser) {
				req.session.errorMessage =
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
	static getGTest = (req, res) => {
		let msg = req.session.updateMessage
		delete req.session.updateMessage
		res.render('gTest', {
			searchedData: req.session.userData,
			banner: 'G-Test Page',
			subheading: msg || 'Your Test Details',
			loggedIn: req.session.loggedIn,
			userData: req.session.userData,
		})
	}
	static postGTest = async (req, res) => {
		try {
			const updatedData = req.body
			let update = await user.findOneAndUpdate(
				{ _id: req.session.userData._id },
				{
					$set: {
						username: req.session.userData.username,
						password: req.session.userData.password,
						userType: req.session.userData.userType,
						firstName: req.session.userData.firstname,
						lastName: req.session.userData.lastname,
						age: req.session.userData.age,
						licenseNo: req.session.userData.licenseno,
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
			req.session.updateMessage = 'Data has successfully updated'
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
			req.session.updateMessage =
				'Please fill the G2 Form to update your details.'
			res.render('g2Test', {
				banner: 'G2-Test',
				subheading: 'Book your G2-Test Here',
				loggedIn: req.session.loggedIn,
				userData: req.session.userData,
				userType: req.session.userData.userType,
			})
		} else {
			req.session.updateMessage = 'Your Details Here.'
			res.redirect('/gTest')
		}
	}
	static postG2Test = async (req, res) => {
		try {
			const data = req.body

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
						carDetails: {
							make: data.make,
							model: data.model,
							year: data.year,
							plateNo: data.plate,
						},
					},
				},
				{ new: true }
			)
			req.session.userData = currentUserData
			req.session.updateMessage = 'Data has been updated successfully.'
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
	static getAppointment = (req, res) => {
		res.render('appointment')
	}
}

export default userController
