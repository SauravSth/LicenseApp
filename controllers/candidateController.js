import user from '../models/userModel.js'

class candidateController {
	static getCandidate = (req, res) => {
		res.render('candidate', {
			banner: 'Candidate Information',
			subheading: '' ?? msg,
		})
	}
	static postCandidate = async (req, res) => {
		const option = req.body.candidateType

		const candidateData = await user.find({
			testType: 'G',
			testResult: { result: option },
		})
        console.log("candidate data"+candidateData);
		res.render('candidate', {
			banner: 'Candidate Information',
			subheading: '' ?? msg,
			candidateData: candidateData,
		})
	}
}

export default candidateController
