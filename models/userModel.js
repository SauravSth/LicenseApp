import mongoose from 'mongoose'
import {} from 'dotenv/config'

const URI = process.env.URI
// 'mongodb+srv://Saurav:naruxhina@cluster0.wuw4gfs.mongodb.net/GLicense?retryWrites=true&w=majority'

mongoose
	.connect(URI)
	.then(() => console.log('Connected to DB'))
	.catch((e) => console.log(e))

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
})

const appointmentSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: Date,
		required: true,
	},
	isAvailable: {
		type: Boolean,
	},
})

const user = mongoose.model('User', userSchema)
const appointment = mongoose.model('Appointment', appointmentSchema)

export { user, appointment }
