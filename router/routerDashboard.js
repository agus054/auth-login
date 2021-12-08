const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../halpers/jwtHalpers")
const { decryptPayload } = require("../halpers/encPayload");

router.get("/dashboard", async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await verifyAccessToken(token.split(" ")[1]);
        const userId = decryptPayload(user.aud);
        // const token = res.req.headers.authorization;
        res.status(200).json({
            status: 0,
            message: "ok",
            data: userId
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;