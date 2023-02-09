import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BlogSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
			unique: true,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
		tags: {
			type: [String],
			required: true,
		},
		body: {
			type: String,
			require: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		versionKey: false,
		id: true,
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

export const BlogModel = model('Blog', BlogSchema);
