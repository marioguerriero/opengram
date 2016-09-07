var express = require('express');
var expressJwt = require('express-jwt');
var multer = require('multer');

var parse = require('url-parse');

var config = require('./../config');

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

module.exports = router;