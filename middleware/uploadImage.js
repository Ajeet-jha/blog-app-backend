import multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		fs.mkdir('dist/uploads/', (err) => {
			if (err) {
				console.log(err);
				return false;
			}
			cb(null, 'dist/uploads/');
		});
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname  }-${  Date.now()}`);
	},
});

export const upload = multer({ storage });
