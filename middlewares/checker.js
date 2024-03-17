class checker {
	static validUser = async (req, res, next) => {
		if (!req.session.loggedIn) {
			return res.redirect('/login')
		}
		next()
	}
	static userType = (req, res, next) => {
		if (req.session.userData.userType != 'driver') {
			req.session.dashboardMessage =
				'Access blocked. UserType is not Driver'
			return res.redirect('/')
		}
		next()
	}
}

export default checker
