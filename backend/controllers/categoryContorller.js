const Category = require('../models/category');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// create new category => /api/v1/category/create
exports.newCategory = catchAsyncErrors (async ( req, res, next ) => {

    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        category
    })
})

// get all categories => /api/v1/categories
exports.getAllCategories = catchAsyncErrors (async (req, res, next) => {
    const categories = await Category.find().sort({'name': 'asc'});

    res.status(200).json({
        success: true,
        count: categories.length,
        categories
    })
})

// get single category => /api/v1/category/:id
exports.getCategory = catchAsyncErrors (async (req, res, next) => {
    const category = await Category.findById(req.params.id);

	if (!category) {
        
		return next(new ErrorHandler('Category not found', 404));
	}

	res.status(200).json({
		success: true,
		category
	});
})

// update category /api/v1/admin/category/:id
exports.updateCategory = catchAsyncErrors (async (req, res, next) => {

    let category = await Category.findById(req.params.id);

    if (!category) {
        
		return next(new ErrorHandler('Category not found', 404));
	}

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		category
	});
});

// delete category => /api/v1/admin/category/:id
exports.deleteCategory = catchAsyncErrors (async (req, res, next) => {
	const { id } = req.params;
	const category = await Category.findById(id);
	
	if (!category) {
        
		return next(new ErrorHandler('Category not found', 404));
	}

	await category.remove();

	res.status(200).json({
		success: true,
		message: 'Category deleted!',
	});
});