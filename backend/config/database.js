const mongoose = require('mongoose');

const url = "";
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

