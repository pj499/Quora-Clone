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
                askedByName:user.name
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

module.exports.fetchQuestions =async function(req, res){
    try {
        let questions = await Question.find({})
        console.log("questions: ",questions);
        return res.status(200).send({
            message: 'Questions fetched Successfully!',
            questions
        })

    } catch (error) {
        console.log('Error in fetchQuestions', error);
        return res.status(400).send({
            message: 'Error in fetching question!'
        })
    }
}

module.exports.addAnswer= async function(req, res){
    try {
        let ans = req.body.answer;
        let ansBy = req.body.answeredBy;
        let ansOfQuestion = req.body.answerOfQuestion;

    } catch (error) {
        
    }
}