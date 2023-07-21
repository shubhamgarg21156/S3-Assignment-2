require('dotenv').config();

const express = require("express");
const path = require('path');
const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/users.js");
const { authorizeAdmin , authorizeUser, authorize} = require("./auth/authorize.js");
const {checkToken} = require("./auth/token_validation.js");
const cookieParser = require('cookie-parser');


const app  = express();

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(cookieParser());

app.set('view engine','hbs');

// Parse JSON bodies (as sent by clients)
app.use(express.json());

//parse url-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

//Defining the routes
app.use('/admin' , adminRoutes);
app.use('/user' , userRoutes);

app.get('/',authorize);

app.get('/admin-page',checkToken,authorizeAdmin,(req,res) => {
    return res.render("admin");
})

app.get('/user-page',checkToken,authorizeUser,(req,res) => {
    return res.render("user");
})

const PORT = 8000; //port number to run the server
app.listen(PORT,(err) => {
    if(err){
        console.log("Error while running sever");
        return;
    }
    console.log("Server is running on port",PORT);
})