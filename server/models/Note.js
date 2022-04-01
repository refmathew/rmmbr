const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please provide title...'],
		trim: true
	},
	body: String,
	pageName: {
		type: String,
		required: [true, 'Please provide page name...']
	},
	dateCreated: {
		type: Date,
		default: new Date()
	},
	lastUpdated: Date,
}, { collection: 'notes' });

module.exports = mongoose.model('Note', NoteSchema);
