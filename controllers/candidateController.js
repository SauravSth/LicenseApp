import user from '../models/userModel.js'

class candidateController {
	static getCandidate = (req, res) => {
		res.render('candidate', {
			banner: 'Candidate Information',
			subheading: '' ?? msg,
		})
	}
	static postCandidate = async (req, res) => {
		const option = JSON.parse(req.body.candidateType)

		const candidateData = await user.find({
			testType: 'g',
			'testResult.result': option,
		})
		res.render('candidate', {
			banner: 'Candidate Information',
			subheading: '',
			candidateData: candidateData,
		})
	}
}

export default candidateController
