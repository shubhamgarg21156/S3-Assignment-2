const db = require("../db/db.js");
const {genSaltSync , hashSync} = require("bcrypt");

//end-point to create a new user.
exports.createUser = (req,res) => {

    const salt = genSaltSync(10);
    const enc_pass = hashSync(req.body.password,salt); //encrypted password

    const q = "INSERT INTO users (username,password,role) VALUES (?)";
    const values = [
        req.body.username,
        enc_pass,
        req.body.role
    ];

    db.query(q, [values], (err,data) => {
        if(err)
            return res.status(500).json({
                success:0,
                message:"Database connected error!"
            });
        
        return res.status(200).json({
            success:1,
            message:"User has been created successfully",
        });
    });
}

//end-point to fetch all users
exports.allUsers = (req,res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err,data) => {
        if(err)
            return res.status(500).json(err);
        else   
            return res.status(200).json(data);
    })
}

//end-point to updata a user
exports.updateUser = (req,res) => {
    
}

//end-point to delete a user
exports.deleteUser = (req,res) => {

    if(!req.body.id)
        return res.status(500).json({
            success:0,
            message:"please send id"
        });
        
    db.query("SELECT * FROM users where id = ?",[req.body.id],(err,data) => {
        if(err)
            return res.status(500).json(err);
        
            if(data && data.length == 0)
                return res.status(500).json({
                    success:0,
                    message:"No user exists with that id"
                });
                
            const q = "DELETE FROM users where id = ?";

            db.query(q, [req.body.id] , (err,data) => {
                if(err){
                    return res.status(500).json(err);
                }
        
                return res.status(500).json({
                    success:1,
                    message:"User has been deleted"
                });
            })
    });
}
