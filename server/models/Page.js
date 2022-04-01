const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	book: {
		type: String,
		required: true,
		enum: {
			values: ['note', 'todo'],
			message: '{VALUE} is not a valid book type.'
		}
	},
	emoticon: {
		type: String
	},
	dateCreated: {
		type: Date,
		default: new Date()
	},
	lastUpdated: [Date]
}, { collection: 'pages' });

module.exports = mongoose.model('Page', PageSchema);
