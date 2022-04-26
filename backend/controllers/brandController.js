const Brand = require('../models/brand');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// create new brand => /api/v1/brand/create
exports.newBrand = catchAsyncErrors (async ( req, res, next ) => {

    const brand = await Brand.create(req.body);

    res.status(201).json({
        success: true,
        brand
    })
})

// get all brands => /api/v1/brands
exports.getAllBrands = catchAsyncErrors (async (req, res, next) => {
    
    const brands = await Brand.find().sort({'name': 'asc'});

    res.status(200).json({
        success: true,
        count: brands.length,
        brands
    })
})

// get single brand => /api/v1/brand/:id
exports.getBrand = catchAsyncErrors (async (req, res, next) => {
    
    const brand = await Brand.findById(req.params.id);

	if (!brand) {
        
		return next(new ErrorHandler('Brand not found', 404));
	}

	res.status(200).json({
		success: true,
		brand
	});
})

// update brand => /api/v1/admin/brand/:id
exports.updateBrand = catchAsyncErrors (async (req, res, next) => {

    let brand = await Brand.findById(req.params.id);

    if (!brand) {
        
		return next(new ErrorHandler('Brand not found', 404));
	}

    brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		// runValidators: true,
		// useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		brand
	});
});

// delete brand => /api/v1/admin/brand/:id
exports.deleteBrand = catchAsyncErrors (async (req, res, next) => {
	
    const { id } = req.params;
	const brand = await Brand.findById(id);
	
	if (!brand) {
        
		return next(new ErrorHandler('Brand not found', 404));
	}

	await brand.remove();

	res.status(200).json({
		success: true,
		message: 'Brand deleted!',
	});
});