class checker {
	static validUser = async (req, res, next) => {
		if (!req.session.loggedIn) {
			return res.redirect('/login')
		}
		next()
	}
	static userTypeDriver = (req, res, next) => {
		if (req.session.userData.userType != 'driver') {
			req.session.message = 'Access blocked. UserType is not Driver'
			return res.redirect('/')
		}
		next()
	}
	static userTypeAdmin = (req, res, next) => {
		if (req.session.userData.userType != 'admin') {
			req.session.message = 'Access blocked. UserType is not Admin'
			return res.redirect('/')
		}
		next()
	}
	static userTypeExaminer = (req, res, next) => {
		if (req.session.userData.userType != 'examiner') {
			req.session.message = 'Access blocked. UserType is not Examiner'
			return res.redirect('/')
		}
		next()
	}
}

export default checker
