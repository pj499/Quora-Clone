const User= require('../../models/users')
const Question= require('../../models/question')

module.exports.addQuestion= async function(req, res){
    try {
        console.log('inside add question')
        let ques= req.body.question;
        let askedByEmail= req.body.askedByEmail;

        let user= await User.findOne({email: askedByEmail});
        if(user){
            const question= await Question.create({
                question: ques,
                askedBy: user._id,
            })

            user.questions.push(question._id);
            user.save();

            return res.status(200).send({
                message: 'Question Added Successfully!'
            })
        }
    } catch (error) {
        console.log('Error in addQuestion', error);
        return res.status(400).send({
            message: 'Error in adding question!'
        })
    }
}
