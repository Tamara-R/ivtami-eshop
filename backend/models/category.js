const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
		type: String,
		required: [true, 'Please enter category name'],
		trim: true,
		maxLength: [191, 'Category name cannot exceed 191 characters'],
	},
	description: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Category', categorySchema);