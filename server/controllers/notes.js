const Note = require('../models/Note');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');

const getNote = asyncWrapper(async (req, res, next) => {
	// create an alias of the id
	const { pageName, noteId } = req.params;
	console.log(req.params)
	// find note based on its page and id
	const note = await Note.findOne({ _id: noteId, pageName: pageName });

	if (!note) {
		return next(createCustomError(404, "Note not found."));
	}

	res.status(200).json({ success: true, data: note });
})

const getFirst = asyncWrapper(async (req, res, next) => {
	const note = await Note.findOne();
	res.status(200).json({ success: true, data: note })
})

const getNotes = asyncWrapper(async (req, res, next) => {
	let { pageName } = req.params;
	const note = await Note.find({ pageName: pageName });

	if (note.length === 0) {
		return next(createCustomError(404, 'Note pages not found.'));
	}

	res.status(200).json({ success: true, data: note });
})

const getAllNotes = asyncWrapper(async (req, res, next) => {
	const note = await Note.find({});
	res.status(200).json({ data: note });
})

const createNote = asyncWrapper(async (req, res, next) => {
	try {
		const note = await Note.create(req.body);
		res.status(201).json({ data: note });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
	// !note ? next(createCustomError(404, 'Unable to create note')) : res.status(201).json({ data: note });
})

const updateNote = asyncWrapper(async (req, res, next) => {
	const { page, id: noteId } = req.params;
	const updateValues = req.body;
	const note = await Note.findOneAndUpdate({ page: page, _id: noteId }, updateValues, {
		new: true,
		runValidators: true,
	});

	if (!note) {
		return next(createCustomError(404, 'Note not found.'));
	}

	res.status(200).json({ data: note });
})

const deleteNote = asyncWrapper(async (req, res, next) => {
	const { page, id: noteId } = req.params;
	const note = await Note.findOneAndDelete({ page: page, _id: noteId });

	if (!note) {
		return next(createCustomError(404, 'Note not found.'));
	}

	res.status(200).json({ data: note });
})

const deleteMultipleNotes = asyncWrapper(async (req, res, next) => {
	let { ids } = req.body;

	const note = await Note.deleteMany({
		_id: {
			$in: ids
		}
	});

	if (note.deletedCount < 1) {
		return next(createCustomError(404, 'Cannot find note\(s\)'));
	}

	res.status(200).json({ data: note });
})


module.exports = {
	getNote,
	getNotes,
	getAllNotes,
	createNote,
	updateNote,
	deleteNote,
	deleteMultipleNotes
}
