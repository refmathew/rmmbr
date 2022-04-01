// initialize router
const express = require('express');
const router = express.Router();
// import controllers
const {
	getNote,
	getNotes,
	getAllNotes,
	createNote,
	updateNote,
	deleteNote,
	deleteMultipleNotes
} = require('../controllers/notes.js');

// routes
// /api/notes/
router.route('/')
	.get(getAllNotes)
	.post(createNote)
	.delete(deleteMultipleNotes);
router.route('/:pageName')
	.get(getNotes)
// /api/notes/:page/:id
router.route('/:pageName/:noteId')
	.get(getNote)
	.patch(updateNote)
	.delete(deleteNote);

module.exports = router;
