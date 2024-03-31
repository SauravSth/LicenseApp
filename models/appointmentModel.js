import mongoose from 'mongoose'

const appointmentSchema = mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	isAvailable: {
		type: Boolean,
		default: true,
	},
})

const appointment = mongoose.model('Appointment', appointmentSchema)

export default appointment
