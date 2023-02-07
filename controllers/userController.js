import * as fs from 'fs';
import * as path from 'path';
import { UserModel as User } from '../model/UserSchema';

export const registerUser = async (req, res) => {
	const { firstname, lastname, phone, email, password } = req.body;

	const image = {
		data: fs.readFileSync(
			path.join(`${__dirname  }/uploads/${  req.file.filename}`)
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
