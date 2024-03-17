class checker {
	static validUser = async (req, res, next) => {
		if (!req.session.loggedIn) {
			res.redirect('/login')
		}
		next()
	}
	static userType = (req, res, next) => {
		if (req.session.userData.userType != 'driver') {
			req.session.dashboardMessage = 'UserType is not Driver'
			return res.redirect('/')
		}
		next()
	}
}

export default checker
