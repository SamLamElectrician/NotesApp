//file for express settings

//for environment keys
import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('hello world');
});

export default app;
