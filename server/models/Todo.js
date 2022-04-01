const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please provide name...']
	},
	body: String,
	completed: {
		type: Boolean,
		default: false,
	},
	pageId: {
		type: mongoose.ObjectId,
		required: [true, 'Please provide page...']
	},
	dateCreated: Date,
	lastUpdated: Date
}, { collection: 'todos' });

module.exports = mongoose.model('Todo', TodoSchema);
