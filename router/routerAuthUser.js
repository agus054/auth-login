const express = require("express");
const { login, register, refreshToken, logout} = require("../controler/authControler")
const router = express.Router();


router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", refreshToken);
router.delete("/logout", logout);

module.exports = router;