import express from 'express';
import expressJwt from 'express-jwt';
import multer from 'multer';
import parse from 'url-parse';
import config from './../config';

var url = parse(config.dbhost);

var gridfs = require('gridfs-storage-engine')({
    database: config.dbname,
    hostname: (url.auth ? url.auth + '@' : '') + url.hostname,
    port: url.port
});

var upload = multer(({
    storage: gridfs
}));

var router = express.Router();

router.route('/')
    .all(expressJwt({secret:config.secret})) // Do not allow anybody to upload files
    .post(upload.single('media'), function(req, res) {
        if(!req.file) return res.sendStatus(400); // Bad request
        return res.status(200).json(req.file.gridfsEntry);
    });

export default router;
