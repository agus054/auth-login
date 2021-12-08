const createError = require("http-errors");
const { signAccessToken, verifyAccessToken } = require("./halpers/jwtHalpers");

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            if (!req.headers["authorization"]) throw createError.Unauthorized();
            const bearerToken = req.headers["authorization"];
            
            const token = bearerToken.split(" ")[1];
            const payload = await verifyAccessToken(token);
            next();
        } catch (error) {
            
            next(createError.Unauthorized(error.message));
        }

    }
}