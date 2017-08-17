import express from 'express';
import jwtMiddleware from './jwt-middleware';
import multer from 'multer';
import config from './../config';

const DEST_PATH = 'client/static/uploads/';

const upload = multer({
  dest: DEST_PATH
}).single('media');

const router = express.Router();

const dev = process.env.NODE_ENV !== 'production';

router.post('/upload', jwtMiddleware, (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return
    }
    // Everything went fine
    res.json({ path: '/static/uploads/' + req.file.filename });
    res.end();
  });
});

export default router;
