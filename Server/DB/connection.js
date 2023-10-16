const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
	.connect(DB)
	.then(() => {
		console.log("Database connection successful");
	})
	.catch((err) => {
		console.log(err);
		console.log("Database connection not successful");
	});
