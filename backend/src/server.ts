import express from 'express';
//for environment keys
import 'dotenv/config';
//for mongooes settings
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
	res.send('hello world');
});

const port = process.env.PORT;

mongoose
	.connect(process.env.MONGO_CONNECTION_STRING!)
	.then(() => {
		console.log('Mongoose connected');
		app.listen(port, () => {
			console.log('Server running on port:' + port);
		});
	})
	.catch(console.error);
