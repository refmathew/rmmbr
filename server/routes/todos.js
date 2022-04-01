const express = require('express');
const router = express.Router();

const {
	getTodos,
	createTodo,
	updateTodo,
	deleteTodo,
	deleteMultipleTodos
} = require('../controllers/todos');

router.route('/')
	.get(getTodos)
	.post(createTodo);

router.route('/:pageId/:todoId')
	.patch(updateTodo)
	.delete(deleteTodo);

router.route('/:pageId')
	.delete(deleteMultipleTodos);

module.exports = router;
