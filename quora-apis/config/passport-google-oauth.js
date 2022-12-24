const passport=require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User =require('../models/users');

passport.use(new googleStrategy({
    clientID:"678047914834-4dm4e482gots9khrj8sfb1kugl90cgin.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/googleSignIn/callback"
},async function(accessToken,refreshToken,profile,done){
    // console.log('profile in google auth', profile)
    let user= await User.findOne({email: profile.emails[0].value});
    if(user){
        return done(null,user);
    }else{
        
        let newUser= await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(10).toString('hex'),
            verified: true
        })
        
        if(!newUser){
            return res.status(400).send({
                message: 'Error in signing up with google.'
            })
        }else{
            // console.log('newUser', newUser)
            return done(null, newUser);
        }
    }
}))

passport.serializeUser((user, done)=>{
    done(null,user)
})

passport.deserializeUser((user, done)=>{
    done(null,user)
})
