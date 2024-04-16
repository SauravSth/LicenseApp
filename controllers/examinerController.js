class examinerController {
	static getExaminer = (req, res) => {
		const msg = req.session.message
		delete req.session.message
		res.render('examiner', {
			banner: 'Examiner Page',
			subheading: msg || '',
		})
	}
}

export default examinerController
