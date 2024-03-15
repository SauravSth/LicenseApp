import user from '../models/userModel.js'
import bcrypt from 'bcrypt'

class userController {
	static getDashboard = (req, res) => {
		res.render('dashboard', {
			banner: 'Dashboard',
			subheading: 'Your Data Here',
			loggedIn: req.session.loggedIn,
		})
	}
	static getLogin = (req, res) => {
		res.render('Login', {
			banner: 'Login',
			subheading: 'Login Here',
			loggedIn: req.session.loggedIn,
		})
	}
	static postLogin = async (req, res) => {
		try {
			const data = req.body

			const userData = await user.findOne({ username: data.username })

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
				})
			} else {
				req.session.message = 'Incorrect Password'
				res.redirect('/login')
			}
		} catch (e) {
			console.log(e)
		}
	}
	static getSignup = (req, res) => {
		res.render('signup', {
			banner: 'Signup',
			subheading: 'Sign Up Here',
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
			subheading: 'Login for G-Test',
			loggedIn: req.session.loggedIn,
			exists: true,
		})
	}
	static postGTest = async (req, res) => {
		try {
			let userData = await user.findOne({ _id: req.session.userData._id })

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
	static getG2Test = async (req, res) => {
		const checkDefault = await user.findOne({
			_id: req.session.userData._id,
		})
		if (checkDefault.licenseNo == 'DEFAULT') {
			res.render('g2Test', {
				banner: 'G2-Test',
				subheading: 'Book your G2-Test Here',
				loggedIn: req.session.loggedIn,
			})
		} else {
			res.redirect('/')
		}
	}
	static postG2Test = async (req, res) => {
		try {
			const data = req.body

			const newUser = new user({
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
				loggedIn: req.session.loggedIn,
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
