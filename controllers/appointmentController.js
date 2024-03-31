import appointment from '../models/appointmentModel.js'

class appointmentController {
	static getAppointment = async (req, res) => {
		let msg = req.session.message
		delete req.session.message

		res.render('appointment', {
			banner: 'Appointment Page',
			subheading: msg,
		})
	}
	static postAppointment = async (req, res) => {
		try {
			let data = req.body

			const newAppointment = new appointment({
				date: data.appointmentDate,
				time: data.timeslot,
			})
			await newAppointment.save()
			req.session.message = `${newAppointment.time} time slot created on date ${newAppointment.date} `
			return res.redirect('/')
		} catch (e) {
			console.log(e)
		}
	}
	static getTimeSlots = async (req, res) => {
		try {
			let data = await appointment.find({}).sort('time')
			res.json(data)
		} catch (e) {
			console.log(e)
		}
	}
}

export default appointmentController
