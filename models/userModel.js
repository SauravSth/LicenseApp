// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const URI =
	'mongodb+srv://Saurav:naruxhina@cluster0.wuw4gfs.mongodb.net/GLicense?retryWrites=true&w=majority'

mongoose
	.connect(URI)
	.then(() => console.log('Connected to DB'))
	.catch((e) => console.log(e))

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	licenseNo: {
		type: String,
		required: true,
	},
	carDetails: {
		make: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		plateNo: {
			type: String,
			required: true,
		},
	},
})

const userModel = mongoose.model('User', userSchema)

// module.exports = userModel
export default userModel
