const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) => {
    if(error){
        console.log(error);
        return;
    }

    console.log("MySQL connected");
})

module.exports = db;