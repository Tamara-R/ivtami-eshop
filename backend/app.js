const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config({
    path: './config/.env'
    // backend/config/.env
});

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


// import all routes
const products = require('./routes/product');
const category = require('./routes/category');
const brand = require('./routes/brand');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');
const contact = require('./routes/contact');

// app routes
app.use('/api/v1', products);
app.use('/api/v1', category);
app.use('/api/v1', brand);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1', contact);

app.use(errorMiddleware);

module.exports = app;