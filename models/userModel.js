import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	userType: {
		type: String,
		required: true,
		default: 'DEFAULT',
	},
	firstName: {
		type: String,
		required: true,
		default: 'FNAME',
	},
	lastName: {
		type: String,
		required: true,
		default: 'LNAME',
	},
	age: {
		type: Number,
		required: true,
		default: 99,
	},
	licenseNo: {
		type: String,
		required: true,
		default: 'DEFAULT',
	},
	carDetails: {
		make: {
			type: String,
			required: true,
			default: 'DEFAULT',
		},
		model: {
			type: String,
			required: true,
			default: 'DEFAULT',
		},
		year: {
			type: Number,
			required: true,
			default: 2000,
		},
		plateNo: {
			type: String,
			required: true,
			default: 'DEFAULT',
		},
	},
	appointment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Appointment',
	},
	testType: {
		type: String
	},
	testResult: {
		comment: {
			type: String,
			default: 'DEFAULT'
		},
		result: {
			type: Boolean,
		},
	},
})

const user = mongoose.model('User', userSchema)

export default user
