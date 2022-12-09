const express= require('express')
const router= express.Router();
const firstAPI= require("../controllers/index")
const authentication= require('../controllers/api/authentication')

router.get('/', firstAPI.firstAPI)
router.post('/sendVerificationMail', authentication.sendVerificationEmail);
router.post('/verifyOtp', authentication.verifyOtp);
router.post('/resendOtp',authentication.resendOtp);
router.post('/setPassword',authentication.setPassword);
router.post('/login',authentication.login);

module.exports= router;