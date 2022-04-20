const express = require('express');
const router = express.Router();

const {
	findUser
} = require('../controllers/users');

router.route('/login')
	.post(findUser);

module.exports = router
