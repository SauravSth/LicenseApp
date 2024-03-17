class checker {
	static validUser = async (req, res, next) => {
		if (!req.session.loggedIn) {
			console.log('Login Blocked')
			res.redirect('/login')
		}
		next()
	}
	static userType = (req, res, next) => {
		if (req.session.userData.userType != 'driver') {
			console.log('IN MIDDLEWARE NOT DRIVER')
			req.session.message = 'UserType is not Driver'
			return res.redirect('/')
		}
		next()
	}
}

export default checker
