const express = require('express');
const path = require('path');
const fs = require('fs');
const StudyMaterial = require('../models/entities/StudyMaterial');
const storage = require('../services/StudyMaterialsStorage');
const multer = require('multer');


const router = express.Router();
const upload = multer({ storage });

router.post('/:userid', upload.single('document'), async (req, res) => {
    const {userid} = req.params;
    const {title} = req.body;
    const {file} = req;

    if (!file) return res.status(400).json({error: 'No file uploaded'});
    const fileid = path.basename(file.filename, path.extname(file.filename));

    try {
        const studyMaterial = await StudyMaterial.create({
            id: fileid,
            user_id: userid,
            title: title,
            filename: file.originalname,
            upload_time: new Date()
        });

        res.status(201).json({studyMaterial});
    } catch(error) {
        if (file && file.path) {
            fs.unlink(file.path, (err) => {
                if (err) console.error('Error deleting temporary file:', err);
            });
        }
        res.status(500).json({error: error.message});
    }
})


module.exports = router;