const express= require('express')
const router= express.Router();
const firstAPI= require("../controllers/index")
const authentication= require('../controllers/api/authentication')

router.get('/', firstAPI.firstAPI)
router.post('/sendVerificationMail', authentication.sendVerificationEmail)
module.exports= router;