const Contact = require('../models/contact');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// create new contact form => /api/v1/contact/create
exports.newContact = catchAsyncErrors (async ( req, res, next ) => {

    const contact = await Contact.create(req.body);

    res.status(201).json({
        success: true,
        contact
    })
})

// get all contact forms => /api/v1/contacts
exports.getAllContacts = catchAsyncErrors (async (req, res, next) => {
    
    const contacts = await Contact.find();

    res.status(200).json({
        success: true,
        count: contacts.length,
        contacts
    })
})

// get single contact form => /api/v1/contact/:id
exports.getContact = catchAsyncErrors (async (req, res, next) => {
    
    const contact = await Contact.findById(req.params.id);

	if (!contact) {
		return next(new ErrorHandler('Contact form not found', 404));
	}

	res.status(200).json({
		success: true,
		contact
	});
})

// update contact form status => /api/v1/admin/contact/:id
exports.updateContact = catchAsyncErrors (async (req, res, next) => {

    let contact = await Contact.findById(req.params.id);

    if (!contact) {
		return next(new ErrorHandler('Contact not found', 404));
	}

    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		contact
	});
});

// delete contact form => /api/v1/admin/contact/:id
exports.deleteContact = catchAsyncErrors (async (req, res, next) => {
	
    const { id } = req.params;
	const contact = await Contact.findById(id);
	
	if (!contact) {
		return next(new ErrorHandler('Contact form not found', 404));
	}

	await contact.remove();

	res.status(200).json({
		success: true,
		message: 'Contact form deleted!',
	});
});