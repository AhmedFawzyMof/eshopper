const express = require("express");
const router = express.Router();
const controller = require("../controllers/Users.controller");

router.post("/register", controller.Register);
router.post("/login", controller.Login);

module.exports = router;
