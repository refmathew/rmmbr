const express = require('express');
const router = express.Router();

const {
	getAllPages,
	createPage,
	updatePage,
	deletePage
} = require('../controllers/pages');

router.route('/:id')
	.patch(updatePage)
	.delete(deletePage);

router.route('/')
	.get(getAllPages)
	.post(createPage);


module.exports = router;
