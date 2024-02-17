const express = require('express');
const multer = require('multer');

const router = express.Router();

const uploadDestination = 'uploads';

const storage = multer.diskStorage({
	destination: uploadDestination,
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const uploads = multer({ storage: storage });

router.get('/register', (req, res) => {
	res.send('register');
});

module.exports = router;