import express from 'express';
import jwtMiddleware from './jwt-middleware';
import multer from 'multer';
import config from './../config';

const DEST_PATH = 'client/static/uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DEST_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, DEST_PATH + file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
});

const upload = multer({
  dest: DEST_PATH
}).single('media');

const router = express.Router();

router.post('/upload', jwtMiddleware, (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return
    }
    // Everything went fine
    return res.send('/uploads/' + req.file.filename);
  });
});

export default router;
