const mysql = require("mysql");

//const table = 'CREATE TABLE `users` ( `id` int(4) unsigned zerofill NOT NULL AUTO_INCREMENT, `first_name` varchar(100) NOT NULL, `last_name` varchar(100) DEFAULT NULL, `username` varchar(50) DEFAULT NULL, `password` varchar(255) DEFAULT NULL, `email` varchar(50) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (`id`), UNIQUE KEY `email_unique` (`email`), UNIQUE KEY `username_unique` (`username`) ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4';

const createDb = (dbName) => {
    const db = mysql.createConnection({
        host: "",
        user: "",
        password: "",
    });
    db.connect(err => {
        if (err) console.log(err.sqlMessage);
        db.query(`CREATE DATABASE ${dbName}`, err => {
            if (err) console.log(err.sqlMessage);
            return dbName;
        })
    });
}

const createTabel = (tableName) => {
    const db = mysql.createConnection({
        host: "",
        user: "",
        password: "",
        database: createDb('')
    });
    db.query(`CREATE TABLE ${tableName} ( id int(4) unsigned zerofill NOT NULL AUTO_INCREMENT, first_name varchar(100) NOT NULL, last_name varchar(100) DEFAULT NULL, username varchar(50) DEFAULT NULL, password varchar(255) DEFAULT NULL, email varchar(50) DEFAULT NULL, created_at timestamp NOT NULL DEFAULT current_timestamp(), PRIMARY KEY (id), UNIQUE KEY email_unique (email), UNIQUE KEY username_unique (username) ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4)`, err => {
        if (err) console.log(err);
        console.log("Success Create Table");
    });
};

