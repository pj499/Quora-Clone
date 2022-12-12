const User = require('../../models/users')
const nodemailer = require('../../config/nodemailer')
const otpGenerator = require('otp-generator');
const Otp = require('../../models/otp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function sendEmail(res, user) {
    //To generate OTP for user email verification
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    //To set created and expiry time
    const createdTime = Date.now();
    const expiryTime = createdTime + 10 * 60 * 1000;
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
    }, async (err, info) => {
        if (err) {
            console.log("error: ", err);
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

module.exports.sendVerificationEmail = async function (req, res) {
    try {
        console.log("req body: ", req.body);
        //To check if email already exist
        let email = await User.findOne({ email: req.body.email });
        console.log('email:', email);

        if (email) {
            return res.status(409).send({
                message: 'Email already exist!'
            })
        }

        //To create user
        let user = await User.create({
            name: req.body.name,
            email: req.body.email
        })

        return await sendEmail(res, user)

    } catch (error) {
        res.send(400, {
            message: `Error in sendVerificationEmail ${error}`
        })
        console.log('Error in sendVerificationMail: ', error);
        return;
    }
}

module.exports.verifyOtp = async function (req, res) {
    try {

        var reqOtp = req.body.otp;
        var OTP = await Otp.findOne({ userId: req.body.userId })

        if (OTP.otp == reqOtp) {
            //check if otp is correct but expired
            var currentDate = Date.now();
            if (OTP.expiresAt < currentDate) {
                return res.status(401).send({
                    message: 'OTP is expired!'
                })
            }

            //otp matched
            let user = await User.findByIdAndUpdate(req.body.userId, { verified: true });
            await Otp.findByIdAndDelete(OTP._id);
            return res.status(200).send({
                message: 'Email is successfully verified!'
            })
        } else {
            //otp is incorrect
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

module.exports.resendOtp = async function (req, res) {
    try {

        //deleting the old otp 
        console.log("inside resend otp", req.body);
        await Otp.findOneAndDelete({ userId: req.body.userId });
        const user = await User.findById(req.body.userId);
        return await sendEmail(res, user);
    } catch (error) {
        res.send(400, {
            message: `Error in resendOtp ${error}`
        })
        console.log('Error in resendOtp: ', error);
        return;
    }
}

module.exports.setPassword = async function (req, res) {
    try {
        //getting req details
        let password = req.body.password;
        let userId = req.body.userId;

        //encrypting user password using bcrypt
        password = await bcrypt.hash(password, 10);

        //setting user password
        let user = await User.findByIdAndUpdate(userId, { password: password });
        return res.status(200).send({
            message: "Password saved succesfully",
        })


    } catch (error) {
        res.send(400, {
            message: `Error in setPassword ${error}`
        })
        console.log('Error in setPassword: ', error);
        return;
    }
}

module.exports.login = async function (req, res) {
    console.log('inside login');
    try {
        
        let reqEmail = req.body.email;
        let reqPassword = req.body.password;
        console.log('reqEmail and pass', reqEmail, " ", reqPassword);
        //find user by email
        let user = await User.findOne({email:reqEmail});

        //TODO: if user is not verified

        //could not find user
        if(!user){
            return res.status(400).send({
                message:'Invalid Username/Password.'
            });
        }

        console.log('inside login USER', user);

        //comparing password
        let passwordChecker = await bcrypt.compare(reqPassword,user.password);

        console.log('passwordchecker', passwordChecker);

        if(!passwordChecker){
            return res.status(400).send({
                message:'Invalid Username/Password.'
            });
        }

        //generate jwt token
        let accessToken = jwt.sign({email: user.email},'quora-clone-access',{expiresIn:'15s'});
        let refreshToken = jwt.sign({email: user.email}, 'quora-clone-refresh');

        return res.status(200).send({
            message:'Logged in successfully.',
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (error) {
        res.send(400, {
            message: `Error in login ${error}`
        })
        console.log('Error in login: ', error);
        return;
    }
}

module.exports.verifyTokenMiddleware= function(req, res, next){
    try {
        let refreshToken= req.headers.refreshtoken;
        // console.log('refreshtoken in middleware', refreshToken);
        if(refreshToken==null){
            return res.send(403, {
                message: 'Forbidden'
            })
        }
        
        jwt.verify(refreshToken, 'quora-clone-refresh', (err, user)=> {
            if(err){
                console.log('Refershtoken is faulty:', err)

                return res.status(403).send( {
                    message: 'Forbidden'
                })
            }else{
                let accessToken= jwt.sign({email: user.email},'quora-clone-access',{expiresIn:'15s'});
                res.json({accessToken: accessToken});
                
            }
            
        })
        
    } catch (error) {
        res.status(400).send( {
            message: `Error in verifyTokenMiddleware ${error}`
        })
        console.log('Error in verifyTokenMiddleware: ', error);
        return;
    }
}

module.exports.test= function(req, res){
    try {
        return res.status(200).send({
            message:'tested successfully.'
        })
    } catch (error) {
        res.send(400, {
            message: `Error in test ${error}`
        })
        console.log('Error in test: ', error);
        return;
    }
}