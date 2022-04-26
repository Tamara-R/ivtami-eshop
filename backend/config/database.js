const mongoose = require('mongoose');

const url = "mongodb+srv://admin_ivtami:pehblenda.106@cluster0.t3ado.mongodb.net/ivtami?retryWrites=true&w=majority";
const connectDatabase = () => {
	mongoose
		.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useCreateIndex: true,
			
		})
		.then(con => {
			console.log(
				`MongoDB connected to host with mongoose at ${con.connection.host}`
			);
		}).catch((err) => {
            console.log(err);
        });
};

module.exports = connectDatabase;

