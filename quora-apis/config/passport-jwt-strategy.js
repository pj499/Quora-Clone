const passport= require('passport');
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy= require('passport-jwt').Strategy;
const ExtractJWT= require('passport-jwt').ExtractJwt;

var options={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'quora'
}

passport.use(new JWTStrategy(options, function(jwt_payload, done){

}))

module.exports= passport;