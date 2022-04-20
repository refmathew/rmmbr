const mongoose = require('mongoose');

const validateEmail = (email) => {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		validate: {
			validator: validateEmail,
		}
	},
	password: {
		type: String,
		required: true
	}
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
