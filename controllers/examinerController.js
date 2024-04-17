import user from '../models/userModel.js'
class examinerController {
	static getExaminer = async (req, res) => {
		const msg = req.session.message
		delete req.session.message
		const userData = await user.find()
		console.log('Test Result' + userData[0].testResult)
		res.render('examiner', {
			banner: 'Examiner Page',
			subheading: msg || '',
			user1: userData,
		})
	}
	static getTest = async (req, res) => {
		const comm = req.query
		console.log('comm' + comm.result)
		try {
			const user_updated_in_db = await user.findOneAndUpdate(
				{ _id: comm.userId },
				{
					$set: {
						testResult: {
							comment: comm.comment,
							result: comm.result,
						},
					},
				}
			)
		} catch (e) {
			console.log('db not updated ' + e)
		}
	}
}

export default examinerController
