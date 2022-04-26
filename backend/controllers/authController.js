const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');


//register a new user -> /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	
	const { 
		name,
		lastName,
		email,
		password,
		adress,
		city,
		country,
		postalCode,
		phone,
		dateOfBirth
	} = req.body;

	const user = await User.create({
		name,
		lastName,
		email,
		password,
		adress,
		city,
		country,
		postalCode,
		phone,
		dateOfBirth,
		avatar: {
			public_id: 'avatars/default-avatar_phkyqf.jpg',
			url: 'https://res.cloudinary.com/ddcyio10g/image/upload/v1641390299/avatars/default-avatar_phkyqf.jpg',
		},
		
	});

    const confirmUser = await User.findOne({ email: req.body.email });

	if (!confirmUser) {
		return next(new ErrorHandler('User not found.', 404));
	}

	
	const confirmationToken = confirmUser.getConfirmationToken();

	await confirmUser.save({ validateBeforeSave: false });

	
	const resetUrl = `${process.env.FRONTEND_URL}/confirm/${confirmationToken}`;

	const message = `Your account confirmation token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

	try {
		await sendEmail({
			email: confirmUser.email,
			subject: 'Confirm Account e-mail',
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to: ${confirmUser.email}`,
		});

	} catch (error) {
		confirmUser.confirmationToken = undefined;
		confirmUser.confirmationExpire = undefined;

		await confirmUser.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
	
});

//verify user => /api/v1/account/verify
exports.verifyUser = catchAsyncErrors(async (req, res, next) => {

	// hash url token
	const confirmationToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');
	
	
	const user = await User.findOne({
		confirmationToken,
		confirmationExpire: { $gt: Date.now() },
	});

	
	user.status= 'active';
	
	await user.save({ validateBeforeSave: false });

	sendToken(user, 200, res);
});

//login user -> /api/v1/login - or auth/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	
	if (!email || !password) {
		return next(new ErrorHandler('Please enter email & password', 400));
	}

	
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHandler('Invalid Email or Password', 401));
	}

	
	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler('Invalid Password', 401));
	}

    if (user.status === 'pending') {
		return next(new ErrorHandler('Verify your account first!', 403));
	}
	sendToken(user, 200, res);
});


//forgot password -> /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler('User not found with this email', 404));
	}

	//get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	
	const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

	const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password Recovery',
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});


//reset password -> /api/v1/password/reset/
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {


	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');
	
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				'Password reset token is invalid or has been expired',
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler('Password does not match', 400));
	}

	// setup new password
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});


// get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});


// update/change password -> /api/v1/password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	//check previous user password
	const isMatched = await user.comparePassword(req.body.oldPassword);
	if (!isMatched) {
		return next(new ErrorHandler('Old password is incorrect', 400));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendToken(user, 200, res);
});


// update user profile -> /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		adress: req.body.adress,
		city: req.body.city,
		country: req.body.country,
		postalCode: req.body.postalCode,
		phone: req.body.phone,
		dateOfBirth: req.body.dateOfBirth
	};

	// Update avatar
	if (req.body.avatar !== '') {
		const user = await User.findById(req.user.id);

		const image_id = user.avatar.public_id;
		const res = await cloudinary.v2.uploader.destroy(image_id);

		const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'avatars',
			width: 150,
			crop: 'scale',
		});

		newUserData.avatar = {
			public_id: result.public_id,
			url: result.secure_url,
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true
	});
});


// logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Logged out',
	});
});

// admin section

// get all users -> /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});


// get user details -> /api/v1/admin/users/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`User is not found with id: ${req.params.id}`)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});


// create new user - admin => /api/v1/admin/user/create
exports.newUser = catchAsyncErrors (async ( req, res, next ) => {

	const { 
        name,
		lastName,
		email,
		password,
		adress,
		city,
		country,
		postalCode,
		phone,
		dateOfBirth,
		role
    } = req.body;

	const user = await User.create({
		name,
		lastName,
		email,
		password,
		adress,
		city,
		country,
		postalCode,
		phone,
		dateOfBirth,
		role,
		avatar: {
            public_id: 'avatars/default-avatar_phkyqf.jpg',
			url: 'https://res.cloudinary.com/ddcyio10g/image/upload/v1641390299/avatars/default-avatar_phkyqf.jpg',
		},
		status: 'active'
	});

	const message = `Your account has been created! You can login now with e-mail: ${user.email} and password: asdf`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Account Created',
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
			user
		});

	} catch (error) {
		
		return next(new ErrorHandler(error.message, 500));
	}

})


// update user profile -> /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		adress: req.body.adress,
		city: req.body.city,
		country: req.body.country,
		postalCode: req.body.postalCode,
		phone: req.body.phone,
		dateOfBirth: req.body.dateOfBirth,
		role: req.body.role,
		status: req.body.status
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		user
	});
});


// delete user -> /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`User is not found with id: ${req.params.id}`)
		);
	}

	const image_id = user.avatar.public_id;
	await cloudinary.v2.uploader.destroy(image_id);

	await user.remove();

	res.status(200).json({
		success: true,
	});
});