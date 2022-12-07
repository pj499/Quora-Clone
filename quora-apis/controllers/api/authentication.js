const User= require('../../models/users')
const nodemailer= require('../../config/nodemailer')
const otpGenerator= require('otp-generator');
const Otp = require('../../models/otp');
const LocalStorage= require('node-localstorage').LocalStorage;

module.exports.sendVerificationEmail= async function(req, res){
    
    try {
        console.log("req body: ", req.body);
        //To check if email already exist
        let email= await User.findOne({email: req.body.email});
        console.log('email:', email);

        if(email){
            return res.status(409).send({
                message: 'Email already exist!'
            })
        }

        //To create user
        let user= await User.create({
            name: req.body.name,
            email: req.body.email
        })

        var localStorage = new LocalStorage('../quora-clone/src/scratch');
        localStorage.setItem("userId", user._id);
        console.log('local', localStorage.getItem('userId'))
        
        //To generate OTP for user email verification
        let otp= otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})
       
        //To set created and expiry time
        const createdTime= Date.now();
        const expiryTime= createdTime+ 10*60*1000; 
        await Otp.create({
            userId: user._id,
            otp: otp,
            createdAt: createdTime,
            expiresAt: expiryTime
        })

        //To send OTP verification email
        await nodemailer.transporter.sendMail({
            from: 'milkbooproject@gmail.com',
            to: req.body.email,
            subject: 'Verification code',
            html: `<h1> Hi ${req.body.name}!<h1/> <br> <h2>Enter this otp <b> ${otp} </b> to verify your email. Expires in 10 minutes! <h2/>`
        }, (err, info)=> {
            if(err){
                console.log("error: ",err);
                return res.send(400, {
                    message: 'Error in sending email'
                })
            }
            console.log('Message sent ', info);
            return res.send(200, {
                message: 'Verification mail is sent successfully!'
            })
            
        })
    } catch (error) {
        res.send(400,{
            message:`Error in sendVerificationEmail ${error}`
        })
        console.log('Error in sendVerificationMail: ',error);
        return;
    }
}