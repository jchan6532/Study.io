const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const {id} = req.userData;
        const uploadPath = path.join(__dirname, '..', 'uploads', 'study-materials', id);

        // Check if directory exists, create it if it doesn't
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating directory:', err);
                return cb(err);
            }
            else{
                cb(null, uploadPath);
            }
        });
    },
    filename: function(req, file, cb) {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    }
});

module.exports = storage;