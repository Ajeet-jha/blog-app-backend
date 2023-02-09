import * as fs from 'fs';
import * as path from 'path';
import { BlogModel as Blog } from '../model/BlogModel/Blog';
import { RegistrationModel as User } from '../model/AuthModel/Registration';

export const postBlog = async (req, res) => {
	const { title, tags, body } = req.body;
	const image = {
		data: fs.readFileSync(
			path.join(`${__dirname}/uploads/${req.file.filename}`)
		),
		contentType: 'image/png',
	};

	try {
		const user = await User.findById(req.decoded.id, {
			email: 1,
			_id: 1,
		}).exec();
		if (user && user._id) {
			try {
				await Blog.create({
					title,
					image,
					tags,
					body,
					author: user._id,
				});

				res.status(200).send({
					message: 'Post created !!',
					succes: true,
					data: `post created by ${user.email}`,
				});
			} catch (error) {
				res.status(422).send({
					message: error,
					succes: false,
				});
			}
		} else {
			return res.status(422).send({
				succes: false,
				message: 'No user found !!',
			});
		}
	} catch (error) {
		return res.status(422).send({
			succes: false,
			message: error,
		});
	}
};
