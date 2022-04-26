const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const products = require('../data/products.json');

// setting dotenv file
dotenv.config({ path: '../config/.env' });

//connect to database
connectDatabase();

//seed products to database
const seedProducts = async () => {
	try {
		await Product.deleteMany(); //delete all
		console.log('All products are deleted from database!');

		await Product.insertMany(products);
		console.log('All products are added to database!');

		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
};

seedProducts();