const db = require("../db/db.js");

exports.authorize = (req,res) => {
    let token = req.cookies.jsontoken;

    //if token is not present, then go to login page
    if(!token){
        return res.render('login');
    }

    //search for user with the id saved in cookies
    db.query("SELECT * FROM users WHERE id = ?",[req.cookies.id],(err,data) => {

        if(err || !data || data.length ==0){
            return res.render("login");
        }
        
        //if user is not admin, go to users page
        if(data[0].role !== "admin"){
            return res.redirect('/user-page');
        }
        
        //else go to admin page
        return res.redirect('/admin-page');
    })
}

//Authorization middleware to authorize the admin
exports.authorizeAdmin = (req,res,next) => {
    
    db.query("SELECT * FROM users WHERE id = ?",[req.cookies.id],(err,data) => {
        if(err){
            return res.status(403).json({
                success:0,
                message: "Unauthorized to access"
            });
        }

        if(!data || data[0].role !== "admin"){
            return res.status(403).json({
                success:0,
                message: "Unauthorized to access"
            });
        }
        
        next();
    })
}

//Authorization middleware to authorize the user
exports.authorizeUser = (req,res,next) => {
    db.query("SELECT * FROM users WHERE id = ?",[req.cookies.id],(err,data) => {
        if(err){
            return res.status(403).json({
                success:0,
                message: "Unauthorized to access"
            });
        }

        if(!data || data[0].role !== "user"){
            return res.status(403).json({
                success:0,
                message: "Unauthorized to access"
            });
        }
        
        next();
    })
}