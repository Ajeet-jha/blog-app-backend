import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		fs.exists(path.join(__dirname, '/uploads/'), (exists) => {
			if (exists) {
				cb(null, 'dist/uploads/');
			} else {
				fs.mkdir('dist/uploads/', (err) => {
					if (err) {
						console.log('err', err);
						return false;
					}
					cb(null, 'dist/uploads/');
				});
			}
		});
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}-${Date.now()}`);
	},
});

export const upload = multer({ storage });
