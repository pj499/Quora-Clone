const mongoose= require('mongoose')

const otpSchema= mongoose.Schema({
    userId:{
        type: String
    },
    otp:{
        type: Number
    },
    createdAt:{
        type: Date
    },
    expiresAt:{
        type: Date
    }
})

const Otp= mongoose.model('Otp',otpSchema);
module.exports= Otp;