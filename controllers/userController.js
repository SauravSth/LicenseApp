import user from '../models/userModel.js'
import bcrypt from 'bcrypt'

class userController {
	static getDashboard = (req, res) => {
		res.render('dashboard', {
			banner: 'Dashboard',
			subheading: req.session.message,
			loggedIn: req.session.loggedIn,
			userData: req.session.userData,
		})
	}
	static getLogin = (req, res) => {
		res.render('Login', {
			banner: 'Login',
			subheading: req.session.message,
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
					res.render('dashboard', {
						banner: 'Dashboard',
						subheading: 'Successful Login',
						loggedIn: req.session.loggedIn,
						userData: req.session.userData,
					})
				} else {
					req.session.message = 'Incorrect Password'
					res.redirect('/login')
				}
			} else {
				req.session.message = 'You need to Sign Up first.'
				res.redirect('/signup')
			}
		} catch (e) {
			console.log('Login Error')
		}
	}
	static getSignup = (req, res) => {
		res.render('signup', {
			banner: 'Signup',
			subheading: req.session.message,
			loggedIn: req.session.loggedIn,
		})
	}
	static postSignup = async (req, res) => {
		try {
			const data = req.body
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
		res.render('gTest', {
			banner: 'G-Test',
			subheading: 'Your Tests',
			loggedIn: req.session.loggedIn,
			exists: true,
			userData: req.session.userData,
		})
	}
	static postGTest = async (req, res) => {
		try {
			let userData = await user.findOne({ _id: req.session.userData._id })

			res.render('gTest', {
				userData,
				banner: 'G-Test',
				subheading: 'Login for G-Test',
				exists: true,
			})
		} catch (e) {
			console.log(e)
		}
	}
	static getG2Test = async (req, res) => {
		if (
			req.session.userData.licenseNo == 'DEFAULT' ||
			req.session.userData.licenseNo == null
		) {
			res.render('g2Test', {
				banner: 'G2-Test',
				subheading: 'Book your G2-Test Here',
				loggedIn: req.session.loggedIn,
				userData: req.session.userData,
				userType: req.session.userData.userType,
			})
		} else {
			res.render('editDetails', {
				searchedData: req.session.userData,
				banner: 'Edit User Car Details',
				subheading: 'Edit your vehicle details',
				loggedIn: req.session.loggedIn,
				userData: req.session.userData,
			})
		}
	}
	static postG2Test = async (req, res) => {
		try {
			const data = req.body

			// let hashedLicenseNo = await bcrypt.hash(data.licenseno, 10)

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
						licenseNo: data.licenseno,
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
			res.redirect('/gTest')
		} catch (e) {
			console.log(e)
		}
	}
	static getEditDetails = async (req, res) => {
		try {
			res.render('editDetails', {
				searchedData: req.session.userData,
				banner: 'Edit User Car Details',
				subheading: 'Edit your vehicle details',
				loggedIn: req.session.loggedIn,
				userData: req.session.userData,
			})
		} catch (e) {
			console.log(e)
		}
	}
	static postEditDetails = async (req, res) => {
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
			res.redirect('/gTest')
		} catch (e) {
			console.log(e)
		}
	}
	static getDelete = async (req, res) => {
		try {
			console.log('ON DELETE')
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
}

export default userController
