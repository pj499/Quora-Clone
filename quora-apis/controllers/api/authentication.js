const User= require('../../models/users')
const nodemailer= require('../../config/nodemailer')
const otpGenerator= require('otp-generator');
const Otp = require('../../models/otp');

async function sendEmail(res, user){
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
        to: user.email,
        subject: 'Verification code',
        html: `<h1> Hi ${user.name}!<h1/> <br> <h2>Enter this otp <b> ${otp} </b> to verify your email. Expires in 10 minutes! <h2/>`
    }, async(err, info)=> {
        if(err){
            console.log("error: ",err);
            return res.send(400, {
                message: 'Error in sending email'
            })
        }
        console.log('Message sent ', info)
        return res.status(200).json({
            message: 'Verification mail is sent successfully!',
            userId: user._id
        })
    })
}

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

        return await sendEmail(res, user)
        
    } catch (error) {
        res.send(400,{
            message:`Error in sendVerificationEmail ${error}`
        })
        console.log('Error in sendVerificationMail: ',error);
        return;
    }
}

module.exports.verifyOtp= async function(req, res){
    try {
        console.log()
        var reqOtp= req.body.otp;
        var OTP= await Otp.findOne({userId: req.body.userId})
        console.log('OTP from req: ', reqOtp)
        console.log('OTP from DB: ', OTP.otp)

        if(OTP.otp == reqOtp){
            //check if otp is correct but expired
            var currentDate= Date.now();
            if(OTP.expiresAt < currentDate){
                return res.status(401).send({
                    message: 'OTP is expired!'
                })
            }

            return res.status(200).send({
                message: 'Email is successfully verified!'
            })
        }else{
            return res.status(404).send({
                message: 'OTP does not match!'
            })
        }
    } catch (error) {
        console.log('Error in verifyOtp: ', error);
        return res.status(400).send({
            message: 'Error in verifyOtp!'
        })
    }
}

module.exports.resendOtp= async function(req, res){
    try {
        await Otp.findOneAndDelete({userId: req.body.userId});
        const user= await User.findById(res.body.userId);
        return await sendEmail(res, user);
    } catch (error) {
        res.send(400,{
            message:`Error in resendOtp ${error}`
        })
        console.log('Error in resendOtp: ',error);
        return;
    }
}