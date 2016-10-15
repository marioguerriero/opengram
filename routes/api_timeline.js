import express from "express";
import bodyParser from "body-parser";

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get("/timeline", function(req, res) {

});

export default router;