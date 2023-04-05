const express= require('express')
const router= express.Router();
const firstAPI= require("../controllers/index")
const authentication= require('../controllers/api/authentication');
const functionalitites= require('../controllers/api/functionalities')
const userprofile= require('../controllers/api/userprofile');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users')

router.get('/', firstAPI.firstAPI)
router.post('/sendVerificationMail', authentication.sendVerificationEmail);
router.post('/verifyOtp', authentication.verifyOtp);
router.post('/resendOtp',authentication.resendOtp);
router.post('/setPassword',authentication.setPassword);
router.post('/login',authentication.login);
router.post('/test',authentication.verifyTokenMiddleware,authentication.test);
router.get('/logout',authentication.logout);
router.get('/verifyToken',authentication.verifyTokenMiddleware);
router.get('/googleLogin/success', authentication.googleSignIn)
router.get('/googleLogin/failed', (req, res)=>{
    console.log('inside /googleLogin/failed')
    res.status(401).json({
        success: false,
        message: 'Google Login Failed'
    })
})
router.get('/googleSignIn', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/googleSignIn/callback', passport.authenticate('google', {
    successRedirect:'http://localhost:3000/', 
    failureRedirect: '/googleLogin/failed'
}))





router.post('/addQuestion', functionalitites.addQuestion);
router.post('/addAnswer', functionalitites.addAnswer);
router.get('/fetchQuestions',functionalitites.fetchQuestions);
router.get('/:userId', userprofile.fetchUserProfileInfo)
router.get('/:userId/userProfileQuestions', userprofile.fetchUserProfileQuestions)
router.get('/:userId/userProfileAnswers', userprofile.fetchUserAnswers)
router.post('/followUnfollow',userprofile.follow);
router.get('/:userId/followers',userprofile.fetchUserFollowers);
router.get('/:userId/following',userprofile.fetchUserFollowing);

module.exports= router;