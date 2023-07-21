const { verify } = require("jsonwebtoken");

//middleware to check the token
exports.checkToken = (req, res, next) => {
    // let token = req.get('authorization');
    let token = req.cookies.jsontoken;
    if(token){
        // token = token.slice(7);
        verify(token, "abc123" , (err,decoded) => {
            if(err){
                return res.redirect('/');
            }else{
                next();
            }
        })
    }else{
        return res.redirect('/');
    }
}