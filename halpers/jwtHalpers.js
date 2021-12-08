const jwt = require("jsonwebtoken");
const { encryptPayload } = require("./encPayload");


module.exports = {
    signAccessToken: userId => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secretKey = process.env.secret_key_JWT_token;
            const options = {
                expiresIn: "90s",
                issuer: process.env.ISSUER,
                audience: encryptPayload(userId)
            };
            
            jwt.sign(payload, secretKey, options, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
            });
        });
    },
    verifyAccessToken: (token) => {
        return new Promise((resolve, reject) => {
            const secretKey = process.env.secret_key_JWT_token;
            jwt.verify(token, secretKey, (err, result) => {
                if (err) reject(err)
                resolve(result)
            });
        });
    },
    signRefreshToken: userId => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const id = encryptPayload(userId)
            const secretKey = process.env.secret_key_JWT_refresh_token;
            const options = {
                expiresIn: "1h",
                issuer: process.env.ISSUER,
                audience: id
            };
            jwt.sign(payload, secretKey, options, (err, token) => {
                
                if (err) {
                    reject(err.message);
                };
                resolve(token);
            });
        });
    },
    verifyRefresToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.secret_key_JWT_refresh_token, (err, payload) => {
                if (err) reject(err);
                const userId = payload.aud;
                resolve(userId);
            });
        });
    }
};