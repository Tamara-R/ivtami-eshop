const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your first name!'],
		maxLength: [31, 'Name cannot exceed 31 characters!'],
	},
	lastName: {
		type: String,
		required: [true, 'Please enter your last name!'],
		maxLength: [31, 'Name cannot exceed 31 characters!'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email!'],
		unique: true,
		validate: [validator.isEmail, 'Please enter a valid email address!'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password!'],
		minlength: [4, 'Password must be at least 6 characters!'],
		select: false, 
	},
	adress: {
		type: String,
		required: [true, 'Please enter your adress!'],
	},
	city: {
		type: String,
		required: [true, 'Please enter your city!'],
	},
	country: {
		type: String,
		required: [true, 'Please select your country!'],
	},
	postalCode: {
		type: String,
		required: [true, 'Please enter your postal code!'],
	},
	phone: {
		type: String,
		required: [true, 'Please enter your phone number!'],
	},
    dateOfBirth: {
		type: String,
	},
	avatar: {
		public_id: {
			type: String,
		},
		url: {
			type: String,
		},
	},
	role: {
		type: String,
		default: 'user',
	},
	status: {
		type: String,
		default: 'pending',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	confirmationToken: String,
	confirmationExpire: Date,
	activationToken: String,
	activationTokenExpire: Date
});

//encrypt password before saving user
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// //return jwt token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME,
	});
};


// generate password reset token
userSchema.methods.getResetPasswordToken = function () {
	
	//generate the token
	const resetToken = crypto.randomBytes(20).toString('hex');

	//hash and set to resetPasswordToken 
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	//set token to expire
	this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

	return resetToken;
};

userSchema.methods.getActivationToken = function () {
	
	//generate the token
	const resetToken = crypto.randomBytes(20).toString('hex');

	//hash and set to activationToken
	this.activationToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	//set token to expire
	this.activationTokenExpire = Date.now() + 30 * 60 * 1000;

	return resetToken;
};

userSchema.methods.getConfirmationToken = function () {
	
	//generate the token
	const resetToken = crypto.randomBytes(20).toString('hex');

	//hash and set to resetPasswordToken 
	this.confirmationToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	//set token to expire
	this.confirmationExpire = Date.now() + 30 * 60 * 1000;

	return resetToken;
};


module.exports = mongoose.model('User', userSchema);