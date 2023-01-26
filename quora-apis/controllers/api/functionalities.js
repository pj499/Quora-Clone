const User = require("../../models/users");
const Question = require("../../models/question");
const Answer = require("../../models/answer");

module.exports.addQuestion = async function (req, res) {
  try {
    // console.log('inside add question')
    let ques = req.body.question;
    let askedByEmail = req.body.askedByEmail;

    let user = await User.findOne({ email: askedByEmail });
    if (user) {
      const question = await Question.create({
        question: ques,
        askedBy: user._id,
        askedByName: user.name,
        askedByAvatar: user.avatar
      });

      user.questions.push(question._id);
      user.save();

      return res.status(200).send({
        message: "Question Added Successfully!",
      });
    }
  } catch (error) {
    console.log("Error in addQuestion", error);
    return res.status(400).send({
      message: "Error in adding question!",
    });
  }
};

module.exports.fetchQuestions = async function (req, res) {
  try {
    let questions = await Question.find({}).sort({ createdAt: -1 });

    for (let question of questions) {
      var ans = [];
      for (let answerId of question.answers) {
        let answer = await Answer.findById(answerId);
        ans.push(answer);
      }
      question.answers = ans;
    }
    console.log("ques new", questions);

    return res.status(200).send({
      message: "Questions fetched Successfully!",
      questions,
    });
  } catch (error) {
    console.log("Error in fetchQuestions", error);
    return res.status(400).send({
      message: "Error in fetching question!",
    });
  }
};

module.exports.addAnswer = async function (req, res) {
  try {
    let ans = req.body.answer;
    let ansBy = req.body.answeredBy;
    let ansOfQuestion = req.body.answerOfQuestion;
    let question = await Question.findById(ansOfQuestion._id);
    let userAns = await User.findOne({ email: ansBy });
    let answer = await Answer.create({
      answer: ans,
      answeredBy: userAns._id,
      answeredByName: userAns.name,
      answeredByAvatar: userAns.avatar,
      answerOfQuestion: question._id,
      upvotes: 0,
    });
    if (answer) {
      question.answers.push(answer._id);
      question.save();
      return res.status(200).send({
        message: "Answer added successfully!",
      });
    }
  } catch (error) {
    console.log("Error in addAnswer ", error);
    return res.status(400).send({
      message: "Error in adding answer!",
    });
  }
};
