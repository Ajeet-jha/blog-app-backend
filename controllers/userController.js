import * as fs from 'fs';
import * as path from 'path';
import { RegistrationModel as User } from '../model/AuthModel/Registration';

export const registerUser = async (req, res) => {
	const { firstname, lastname, phone, email, password } = req.body;

	const image = {
		data: fs.readFileSync(
			path.join(`${__dirname}/uploads/${req.file.filename}`)
		),
		contentType: 'image/png',
	};
	try {
		const user = await User.create({
			firstname,
			lastname,
			phone,
			email,
			password,
			image,
		});
		res.status(201).send({
			data: user,
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
