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
		const user = await User.findOne({ email: req.email }, { _id: 1 });
		if (user && user._id) {
			try {
				const blog = await Blog.create({
					title,
					image,
					tags,
					body,
					author: user._id,
				});

				res.status(200).send({
					message: 'Post created !!',
					succes: true,
					data: `post created by ${blog.author}`,
				});
			} catch (error) {
				res.status(422).send({
					message: error,
					succes: false,
				});
			}
		}
	} catch (error) {
		return res.status(422).send({
			succes: false,
			message: error,
		});
	}
};
