const express = require('express');
const storage = require('../services/StudyMaterialsStorage');
const multer = require('multer');
const { uploadDocument } = require('../controllers/StudyMaterialController');

const router = express.Router();
const upload = multer({ storage });
const requireAuthProvider = require('../middleware/requireAuthProvider');

router.post('/new', requireAuthProvider, upload.single('document'), uploadDocument);

module.exports = router;