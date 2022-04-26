//imports
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');


// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {

	let images = [];
    if (typeof req.body.images === 'string') {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    let imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'watches'
      });
      imagesLink.push({public_id: result.public_id, url: result.secure_url});
    }
    
    req.body.images = imagesLink;
    req.body.user = req.user._id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product
    })

	
});

// get all products - fitler, search, pagination => /api/v1/products
exports.getProducts = catchAsyncErrors (async (req, res, next) => {

	
	const resPerPage = 6;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
						.pagination(resPerPage);

    
    const products = await apiFeatures.query;
    
	res.status(200).json({
      success: true,
      count: products.length,
	  productsCount,
	  resPerPage,
      products
    })
});

// get all product - second pagination + filter => /api/v1/allproducts
exports.getAllProducts = catchAsyncErrors (async (req, res, next) => {

    const productsCount = await Product.countDocuments();
	const resPerPage = 6;

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
						.pagination(resPerPage);
						
    const products = await apiFeatures.query;
    
	res.status(200).json({
      success: true,
      count: products.length,
	  productsCount,
      products,
	  resPerPage
    })
});

// get a single product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
        
		return next(new ErrorHandler('Product not found', 404));
	}

	res.status(200).json({
		success: true,
		product
	});
});

// update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {

	let product = await Product.findById(req.params.id);

	if (!product) {
        return next(new ErrorHandler('Product not found', 404));
	}

	let images = [];
	if (typeof req.body.images === 'string') {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	if (images !== undefined) {
		
		for (let i = 0; i < product.images.length; i++) {
			const result = await cloudinary.v2.uploader.destroy(
				product.images[i].public_id
			);
		}

		let imagesLinks = [];

		for (let i = 0; i < images.length; i++) {
			const result = await cloudinary.v2.uploader.upload(images[i], {
				folder: 'watches',
			});

			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url,
			});
		}

		req.body.images = imagesLinks;
	}

	
	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		product
	});
});

// delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	

	if (!product) {
        return next(new ErrorHandler('Product not found', 404));
	}

	for (let i = 0; i < product.images.length; i++) {
		await cloudinary.v2.uploader.destroy(product.images[i].public_id);
	}


	await product.remove();

	res.status(200).json({
		success: true,
		message: 'Product deleted!',
	});
});

// create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment
	};

	const product = await Product.findById(productId);

	const isReviewed = product.reviews.find(
		r => r.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		product.reviews.forEach(review => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}

	product.ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
	});
});


// get specific product reviews -> /api/v1/reviews?id=
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});



// delete review => /api/v1/reviews?id=
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
	
	const product = await Product.findById(req.query.productId);

	const reviews = product.reviews.filter(
		review => review._id.toString() !== req.query.id.toString()
	);
	
	const ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
	
	const numOfReviews = reviews.length;

	await Product.findByIdAndUpdate(
		req.query.productId,
		{ reviews, numOfReviews, ratings },
		{ new: true }
	);

	res.status(200).json({
		success: true,
	});
});



// Get all products - admin => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
	const products = await Product.find();

	res.status(200).json({
		success: true,
		products,
	});
});
