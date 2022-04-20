require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const findUser = async (req, res) => {
	const reqBody = req.body
	const { email, password } = reqBody

	let user = await User.findOne({ email })
	if (!user) return res.sendStatus(401)

	const authenticated = await bcrypt.compare(password, user.password)
	if (!authenticated) return res.sendStatus(401)

	user = ({ user: email })
	const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
	res.json({ msg: "Authenticated", accessToken })
}

module.exports = {
	findUser
}
