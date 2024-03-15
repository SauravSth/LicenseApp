// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const URI =
	'mongodb+srv://Saurav:naruxhina@cluster0.wuw4gfs.mongodb.net/GLicense?retryWrites=true&w=majority'

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

const userModel = mongoose.model('User', userSchema)

// module.exports = userModel
export default userModel
