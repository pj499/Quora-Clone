const User = require("../../models/users");
const Question = require("../../models/question");
const Answer = require("../../models/answer");

module.exports.fetchUserProfileInfo = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await User.findById(userId);

    return res.status(200).json({
      message: "User profile info fetched successfully!",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log("Error in fetching user profile info: ", error);
    return res.status(409).json({
      message: "Error in fetching user profile info!",
    });
  }
};

module.exports.fetchUserProfileQuestions = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await User.findById(userId);
    let questions = [];
    for (let questionId of user.questions) {
      let eachQue = await Question.findById(questionId);
      questions.push(eachQue);
    }

    for (let question of questions) {
      var ans = [];
      for (let answerId of question.answers) {
        let answer = await Answer.findById(answerId);
        ans.push(answer);
      }
      question.answers = ans;
    }

    return res.status(200).json({
      message: "User profile questions fetched successfully!",
      data: {
        questions,
      },
    });
  } catch (error) {
    console.log("Error in fetching user profile questions: ", error);
    return res.status(409).json({
      message: "Error in fetching user profile questions!",
    });
  }
};
