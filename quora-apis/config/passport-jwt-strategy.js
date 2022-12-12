const passport= require('passport');
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy= require('passport-jwt').Strategy;
const ExtractJWT= require('passport-jwt').ExtractJwt;
const User = require('../models/users')

var options={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'quora-clone'
}

passport.use(new JWTStrategy(options, async function(jwt_payload, done){
    try {
        let user= await User.findById(jwt_payload._id);
        if(!user){
            return done(null, false);
        }else{
            return done(null, user);
        }
    } catch (error) {
        console.log('Error in passport jwt strategy: ', error);
        return;
    }
    
}))

module.exports= passport;