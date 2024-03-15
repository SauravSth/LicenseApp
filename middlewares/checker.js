class checker {
	static validUser = (req, res, next) => {
		if (!req.session.loggedIn) {
			res.redirect('/login')
		}
		next()
	}
	static userType = (req, res, next) => {
		if (req.session.userData.usertype != 'Driver') {
			res.redirect('/')
		}
		next()
	}
}

export default checker
