const Todo = require('../models/Todo');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');

const getTodos = asyncWrapper(async (req, res, next) => {
	const todo = await Todo.find({});
	res.status(200).send({ success: true, data: todo });
});

const createTodo = asyncWrapper(async (req, res, next) => {
	const todoValues = req.body;
	const todo = await Todo.create(todoValues);
	res.status(201).send({ success: true, data: todo });
});

const updateTodo = asyncWrapper(async (req, res, next) => {
	const { pageId, todoId } = req.params;
	const updateValues = req.body;
	const todo = await Todo.findOneAndUpdate(
		{ page: pageId, _id: todoId },
		updateValues,
		{ new: true, runValidators: true }
	);

	// check if able to find the todo with the given Ids
	if (!todo) {
		return createCustomError(404, 'Todo with page Id: ${pageId}, todo Id: ${todoId} not found.');
	}

	res.status(200).send({ success: true, data: todo });
});

const deleteTodo = asyncWrapper(async (req, res, next) => {
	const { pageId, todoId } = req.params;
	const todo = await Todo.findOneAndDelete(todoValues);

	if (!todo) {
		return createCustomError(404, 'Todo with page Id: ${pageId}, todo Id: ${todoId} not found.');
	}

	res.status(200).send({ success: true, data: todo });
});

const deleteMultipleTodos = asyncWrapper(async (req, res, next) => {
	const pageId = req.params;
	const { todoIds } = req.body.todoIds;
	const todo = await Todo.deleteMany({
		pageId: pageId,
		_id: { $in: todoIds }
	})

	if (!todo) {
		return next(createCustomError(404, 'Todo(s) not found.'))
	}

	res.status(200).send({ success: true, data: todo });
});

module.exports = {
	getTodos,
	createTodo,
	updateTodo,
	deleteTodo,
	deleteMultipleTodos
}
