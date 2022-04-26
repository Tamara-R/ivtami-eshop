const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

//handle Uncaught exceptions
process.on('uncaughtException', err => {
	console.log(`ERROR: ${err.stack}`);
	console.log('Shutting down the server due to Uncaught Exception!');
	process.exit(1);
});

// setting up config file
dotenv.config({
    path: './config/.env'
    // backend/config/.env
});

connectDatabase();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
 
})

const server = app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`));

// handle unhandled promise rejection
process.on('unhandledRejection', err => {
	console.log(`ERROR: ${err.message}`);
	console.log('Shutting down the server due to Unhandled Promise Rejection!');
	server.close(() => {
		process.exit(1);
	});
});

