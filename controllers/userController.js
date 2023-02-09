import * as fs from 'fs';
import * as path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { RegistrationModel as User } from '../model/AuthModel/Registration';

const { ACCESS_SECRET, REFRESH_SECRECT } = process.env;

export const registerUser = async (req, res) => {
	const { firstname, lastname, phone, email, password } = req.body;

	const image = {
		data: fs.readFileSync(
			path.join(`${__dirname}/uploads/${req.file.filename}`)
		),
		contentType: 'image/png',
	};

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	// const resp = bcrypt.compareSync(password, hash);

	try {
		const { _id: id } = await User.create({
			firstname,
			lastname,
			phone,
			email,
			password: hash,
			image,
		});
		const accessToken = jwt.sign({ email, id }, ACCESS_SECRET, {
			expiresIn: '2m',
		});
		const refreshToken = jwt.sign({ email, id }, REFRESH_SECRECT, {
			expiresIn: '10m',
		});
		res.status(201).send({
			message: 'User created !!',
			data: {
				accessToken,
				refreshToken,
			},
			succes: true,
		});
	} catch (error) {
		const { name, code } = error;

		if (name === 'MongoServerError' && code === 11000) {
			return res.status(422).send({
				succes: false,
				message: 'User already exist!',
			});
		}
		return res.status(422).send(error);
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		const allUsers = [];
		users.forEach((user) => {
			allUsers.push({
				firstname: user.firstname,
				lastname: user.lastname,
				phone: user.phone,
				email: user.email,
				image: user.image.data,
				id: user.id,
			});
		});

		res.status(200).send({
			data: allUsers,
			succes: true,
		});
	} catch (error) {
		const { name, code } = error;
		return res.status(422).send({ name, code });
	}
};

export const signInUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne(
			{ email },
			{ _id: 1, password: 1, firstname: 1 }
		);

		if (!user) {
			return res.status(422).send({
				succes: false,
				message: `Users ${email} is not in our DB !!`,
			});
		}
		if (!bcrypt.compareSync(password, user.password)) {
			return res.status(422).send({
				succes: false,
				message: `Users ${email} and ${password} mismatch !!`,
			});
		}

		const accessToken = jwt.sign({ email, id: user._id }, ACCESS_SECRET, {
			expiresIn: '5m',
		});
		const refreshToken = jwt.sign({ email, id: user._id }, REFRESH_SECRECT, {
			expiresIn: '10m',
		});
		res.status(200).send({
			message: 'Login successful !!',
			data: {
				accessToken,
				refreshToken,
			},
			succes: true,
		});
	} catch (error) {
		console.log(error);
		return res.status(422).send({
			succes: false,
			message: error,
		});
	}
};
