const passport=require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User =require('../models/users');

passport.use(new googleStrategy({
    clientID:"",
    clientSecret:"",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},async function(accessToken,refreshToken,profile,done){
    
}))