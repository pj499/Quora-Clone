const mongoose= require('mongoose');
const answerSchema= new mongoose.Schema({
    answer:{
        type: String
    },
    answeredBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answeredByName:{
        type: String
    },
    answeredByAvatar:{
        type: String
    },
    answerOfQuestion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    upvotes:{
        type: Number,
        default:0
    }
}, {timestamps: true})

const Answer= mongoose.model('Answer', answerSchema);
module.exports= Answer;