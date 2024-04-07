const path = require('path');
const fs = require('fs');
const StudyMaterial = require('../models/entities/StudyMaterial');
const { getIO } = require('../services/socket');

const uploadDocument = async (req, res) => {
  const {id} = req.userData;
  const {title} = req.body;
  const {file} = req;

  if (!file) return res.status(400).json({error: 'No file uploaded'});
  const fileid = path.basename(file.filename, path.extname(file.filename));

  try {
      const studyMaterial = await StudyMaterial.create({
          id: fileid,
          user_id: id,
          title: title,
          filename: file.originalname,
          upload_time: new Date()
      });

      res.status(201).json({studyMaterial});

      setTimeout(async () => {
        try {
          const io = await getIO();
          io.emit(`upload`, { message: 'File is done analyzing' });
          console.log('emitted', id);
        } catch (error) {
          console.error('Failed to get Socket.IO instance:', error);
        }
      }, 5000);
  } catch(error) {
      if (file && file.path) {
          fs.unlink(file.path, (err) => {
              if (err) console.error('Error deleting temporary file:', err);
          });
      }
      res.status(500).json({error: error.message});
  }
}

module.exports = {
  uploadDocument
}