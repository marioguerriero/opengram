import express from "express";
import bodyParser from "body-parser";
import jwtMiddleware from './jwt-middleware';
import Post from "./../models/post";

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get("/timeline", jwtMiddleware, function(req, res) {
  let username = req.user.usernme;
});

export default router;
