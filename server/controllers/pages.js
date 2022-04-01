const Page = require('../models/Page');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom_error');

const getAllPages = asyncWrapper(async (req, res, next) => {
	const page = await Page.find({});
	res.send({ data: page });
})

const createPage = asyncWrapper(async (req, res, next) => {
	try {
		const pageValues = req.body;
		const page = await Page.create(pageValues);
		res.send({ data: page });
	} catch (err) {
		res.status(400).send({ success: false, err: err.message })
	}
})

const deletePage = asyncWrapper(async (req, res, next) => {
	const { id: pageId } = req.params;

	const page = await Page.findOneAndDelete({ _id: pageId });
	if (!page) {
		return next(createCustomError(404, "Page with id ${pageId} not found."))
	}

	res.send({ success: true, data: page });
})

const updatePage = asyncWrapper(async (req, res, next) => {
	const { id: pageId } = req.params;
	const pageValues = req.body;
	const page = await Page.findOneAndUpdate(
		{
			_id: pageId
		},
		{
			name: pageValues.name,
			book: pageValues.book,
			emoticon: pageValues.emoticon,
			$push: {
				lastUpdated: new Date()
			}
		},
		{
			new: true,
			runValidators: true
		}
	);

	if (!page) {
		return next(createCustomError(404, "Page with id ${pageId} not found."))
	}

	res.status(200).send({ success: true, data: page });
})


module.exports = {
	createPage,
	getAllPages,
	updatePage,
	deletePage
}
