const db = require("../db/db.js");
const {compareSync} = require("bcrypt");
const {getUserByUsername} = require("./helper.js");
const {sign} = require('jsonwebtoken');

//login the user
exports.login = (req,res) => {
    if(!req.body || !req.body.username || !req.body.password){
        // return res.status(500).json({message:"Username and password not sent"});
        return res.redirect('/');
    }

    const body = req.body;
    getUserByUsername(body.username , (err,results) => {
        if(err){
            // return res.status(500).json(err);
            return res.redirect('/');
        }

        if(!results){
            // return res.status(500).json({
            //     success:0,
            //     message:"Invalid username or password"
            // })
            return res.redirect('/');
        }

        const result = compareSync(body.password,results.password);

        if(result){
            results.password = undefined;
            const jsontoken = sign({ result : results} , "abc123" , {
                expiresIn : "1h"
            });
            
            res.cookie("jsontoken", jsontoken, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
            res.cookie("id",results.id, { httpOnly: true, maxAge: 3600000 });

            // return res.json({
            //     success:1,
            //     message:"login successfully",
            //     token: jsontoken
            // });

            if(results.role === "admin")
                res.redirect('/admin-page')
            else 
                res.redirect('/user-page')
        }else{
            // return res.status(500).json({
            //     success:0,
            //     message:"Invalid username or password"
            // })

            return res.redirect('/');
        }
    })
}

//to logout the logged in user
exports.logout =  (req,res) => {
    //delete token and id from cookies
    res.cookie("jsontoken",undefined);
    res.cookie("id",undefined);
    return res.redirect('/');
}

//to change password of the user
exports.changePassword = (req,res) => {

}

//to show a particular user profile
exports.profile = (req,res) => {
    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q,[req.body.id],(err,data) => {
        if(err)
            return res.status(500).json({
                success:0,
                message:err
            })
            
        //if there is no user with that id,
        if(!data || data.length == 0)
            return res.status(500).json({
                success:0,
                message:"User not found"
            })
            
        //if user is found, return the user
        return res.status(200).json({
            success:1,
            data:data
        })
    })
}

//to show users logs
exports.logs = (req,res) => {

}