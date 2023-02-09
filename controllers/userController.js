import * as fs from 'fs';
import * as path from 'path';
import bcrypt from 'bcryptjs';

import { RegistrationModel as User } from '../model/AuthModel/Registration';

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
		await User.create({
			firstname,
			lastname,
			phone,
			email,
			password: hash,
			image,
		});
		res.status(201).send({
			message: 'User created !!',
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
			{ email: 1, password: 1, firstname: 1 }
		);
		if (!user) {
			return res.status(422).send({
				succes: false,
				message: `Users ${email} is not in our DB !!`,
			});
		} if (!bcrypt.compareSync(password, user.password)) {
			return res.status(422).send({
				succes: false,
				message: `Users ${email} and ${password} mismatch !!`,
			});
		} 
			res.status(200).send({
				data: 'Login successful !!',
				succes: true,
			});
		
	} catch (error) {
		return res.status(422).send({
			succes: false,
			message: error,
		});
	}
};
