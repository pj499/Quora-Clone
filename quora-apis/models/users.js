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
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    verified:{
        type: Boolean,
        default: false
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ],
    token:{
        type:String
    },
    tokenExpiry:{
        type:Date
    }
},{timestamps: true});

const User= mongoose.model('User', userSchema);
module.exports= User