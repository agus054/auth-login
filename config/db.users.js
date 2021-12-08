const mysql = require("mysql");

const connectDb = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME
});



module.exports = {
    //connect ke DB
    connectedDb: () => {
        connectDb.connect(err => {
            err ? console.log(err.sqlMessage) : console.log("Connect to DB");
        });
    },
    //input data user 
    inputDbUsers: (first_name, last_name, username, password, email) => {
        return new Promise((resolve, reject) => {
            connectDb.query(`INSERT INTO users (first_name, last_name, username, password, email) VALUE ('${first_name}', '${last_name}', '${username}', '${password}', '${email}')`, (err, result) => {
                err ? reject(err.sqlMessage) : resolve(result)
            })
        })
    },
    //verifikasi data user saat input
    verifyInsertUsers: (username, email) => { 
        return new Promise((resolve, reject) => {
            connectDb.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`, (err, result) => {
                err ? reject(err.sqlMessage) : resolve(result)
            })
        })
    },
    //verifikasi email atau username dan password saat login
    verifyUsersLogin: (userOrEmail) => { 
        return new Promise((resolve, reject) => {
            connectDb.query(`SELECT * FROM users WHERE username = '${userOrEmail}' OR email = '${userOrEmail}'`, (err, result) => {
                err ? reject(err.sqlMessage) : resolve(result)
            });
        });
    },
    getUser: (username, password) => {
        return new Promise((resolve, reject) => {
            connectDb.query(`SELECT id, first_name, last_name, username, email FROM users `)
        })
    },
    
    updateDb: (data) => {
        return new Promise((resolve, reject) => {
            data = {};
            connectDb.query(``, (err, result) => {
                err ? reject(err.sqlMessage) : resolve(result)
            })
        })
    },
getDataDb: (table) => {
        return new Promise((resolve, reject) => {
            connectDb.query(`SELECT * FROM ${table}`, (err, result) => {
                err ? reject(err.sqlMessage) : resolve(result)
            })
        })
    }
};