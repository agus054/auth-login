const createError = require("http-errors");
const db = require("../config/db.users");
const { encryptPassword, dcryptPassword } = require("../halpers/servicePass");
const { authSchema, authLogin } = require("../halpers/validateAuthSchema");
const { signAccessToken, signRefreshToken, verifyRefresToken } = require("../halpers/jwtHalpers");
const { encryptPayload } = require("../halpers/encPayload");
const { insertDbRedis, deleteDbRedis, getDbRedis } = require("../halpers/redisHalpers");

module.exports = {
    login: async (req, res, next) => {
        try {
            const result = await authLogin.validateAsync(req.body);
            const dataUsers = await db.verifyUsersLogin(Object.values(result)[0]);
            if (dataUsers[0] == undefined) throw createError.BadRequest("Username/Email tidak falid");
            const isPasswordInDb = dataUsers[0].password;
            const verifyPass = await dcryptPassword(result.password, isPasswordInDb);
            if (verifyPass != true) throw createError.BadRequest("Password tidak falid");
            const userId = encryptPayload(dataUsers[0].id)
            const accessToken = await signAccessToken(dataUsers[0].id);
            const refreshToken = await signRefreshToken(dataUsers[0].id);
            const insertRedis = await insertDbRedis(userId, refreshToken);
            if (insertRedis != "OK") throw createError.InternalServerError();
            
            res.status(200).json({
                status: 0,
                message: "ok",
                data: [{ accessToken, refreshToken }]
            });
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    },
    register: async (req, res, next) => {
        try {
            const validateRegister = await authSchema.validateAsync(req.body);
            const verifyUser = await db.verifyInsertUsers(validateRegister.username, validateRegister.email);
            if (verifyUser[0] != undefined) throw createError.BadRequest("Username & Email sudah digunakan sebelum nya");
            const passwordEnc = await encryptPassword(validateRegister.password);
            const resultUser = await db.inputDbUsers(validateRegister.first_name, validateRegister.last_name, validateRegister.username, passwordEnc, validateRegister.email);
            if(resultUser.affectedRows != 1) throw createError.Conflict()
            res.status(201).json({
                status: 0,
                message: "ok",
                data: "Success Register"
            });
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error);
        };
    },
    refreshToken: async (req, res, next) => {
    
        try {
            const { refreshToken } = req.body;
            
            if (!refreshToken) throw createError.BadRequest("Request Not Found");
            const userId = await verifyRefresToken(refreshToken);
            const verifyUserId = await getDbRedis(userId);
            if (verifyUserId == null) throw createError.BadRequest("Token Not Match");
            const newAccessToken = await signAccessToken(userId);
            res.status(200).json({
                status: 0,
                message: "ok",
                data: [{ newAccessToken }]
            })
        } catch (error) {
            next(error);
        };
    },
    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw createError.BadRequest();
    
            const userId = await verifyRefresToken(refreshToken);
            const token = await getDbRedis(userId);
            if(token == null) throw createError.BadRequest("Token Not Found")
            const delUser = await deleteDbRedis(userId);
            if (delUser != 1) throw createError.InternalServerError();
    
            res.status(200).json({
                status: 0,
                message: "ok",
                data: "Success Logout"
            });
        } catch (error) {
            next(error);
        };
    }
}