var express = require('express');
var bodyParser = require('body-parser');

var User = require("./../models/user");

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

module.exports = router;