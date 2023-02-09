import jwt from 'jsonwebtoken';

const { ACCESS_SECRET, REFRESH_SECRECT } = process.env;

export const isAuthenticated = (req, res, next) => {
	try {
		let token = req.get('authorization');
		if (!token) {
			return res.status(404).json({ success: false, msg: 'Token not found' });
		}
		[, token] = token.split(' ');
		const decoded = jwt.verify(token, ACCESS_SECRET);
		req.email = decoded.email;
		next();
	} catch (error) {
		return res.status(401).json({ success: false, msg: error.message });
	}
};

export const verifyRefresh = (email, token) => {
	try {
		const decoded = jwt.verify(token, REFRESH_SECRECT);
		return decoded.email === email;
	} catch (error) {
		return false;
	}
};
