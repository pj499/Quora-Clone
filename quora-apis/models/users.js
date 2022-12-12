const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    },
    verified:{
        type: Boolean,
        default: false
    },
    token:{
        type:String
    },
    tokenExpiry:{
        type:Date
    }
},{timestamps: true});

const User= mongoose.model('User', userSchema);
module.exports= User