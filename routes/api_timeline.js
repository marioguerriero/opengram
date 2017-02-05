import express from "express";
import bodyParser from "body-parser";
import jwtMiddleware from './jwt-middleware';

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get("/timeline", jwtMiddleware, function(req, res) {

});

export default router;
