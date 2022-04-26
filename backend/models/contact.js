const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    fullName: {
		type: String,
		required: [true, 'Please enter your full name'],
		trim: true,
		maxLength: [191, 'Your name cannot exceed 191 characters'],
	},
	email: {
		type: String,
        required: [true, 'Please enter your email address!']
	},
    question: {
		type: String,
        required: [true, 'Please enter your question!']
	},
	status: {
		type: String,
		default: 'Not responded'
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Contact', contactSchema);