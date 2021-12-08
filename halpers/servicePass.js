const bcrypt = require("bcrypt");

module.exports = {
    encryptPassword: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) reject(err.message)
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) reject(err.message);
                    resolve(hash);
                });
            });
        });
    },
    dcryptPassword: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
            });
        });
    }
}