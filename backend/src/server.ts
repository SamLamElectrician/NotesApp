//file for database settings

//import server relating things
import app from './app';
//for mongoose settings
import mongoose from 'mongoose';
//default export for function in utility folder
import env from './utility/validateEnv';

//using hidden port located in env
const port = env.PORT;

//connecting to mongo
mongoose
	.connect(env.MONGO_CONNECTION_STRING)
	.then(() => {
		console.log('Mongoose connected');
		app.listen(port, () => {
			console.log('Server running on port:' + port);
		});
	})
	.catch(console.error);
