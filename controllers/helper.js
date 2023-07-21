const db = require("../db/db.js");

exports.getUserByUsername= (username,callback) => {
    const q = "SELECT * FROM users where username = ?"
    db.query(q,[username],(err,data) => {
        if(err){
            return callback(err);
        }

        return callback(null,data[0]);
    })
}