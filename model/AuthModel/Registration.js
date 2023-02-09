import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const RegistrationSchema = new Schema(
	{
		firstname: {
			type: String,
			require: true,
		},
		lastname: {
			type: String,
		},
		phone: {
			type: Number,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			select: false,
		},
		image: {
			data: Buffer,
			contentType: String,
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

export const RegistrationModel = model('User', RegistrationSchema);
