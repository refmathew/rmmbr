'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const connectDb = require('./db/connect');
const noteRoutes = require('./routes/notes');
const pageRoutes = require('./routes/pages');
const todoRoutes = require('./routes/todos');
const notFound = require('./middleware/404');
const errorHandlerMiddleware = require('./middleware/error_handler');

app.use(express.json());
app.use(cors());
app.use('/api/pages', pageRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/todos', todoRoutes);

// 404
app.use(notFound);
app.use(errorHandlerMiddleware);

// self-invoke initializing the server and db connection
const port = process.env.PORT || 8000;
(async () => {
	try {
		await connectDb(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening to port ${port}...`));
	} catch (err) {
		console.log(err);
	}
})();
