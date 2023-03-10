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

module.exports.fetchUserAnswers = async function(req,res){
  try{
    let userId = req.params.userId;
    let answers = await Answer.find({answeredBy:userId});
    let userInfo = await User.findById(userId);
    let ans=[];
    // console.log("answers: ",answers);
    for(let answer of answers){
      let questionId = answer.answerOfQuestion;
      let question = await Question.findById(questionId);

      answer.answerOfQuestion = question;
      ans.push(answer);
    }
    console.log('ans',ans);
    return res.status(200).send({
      "message":"Answers fetched successfully",
      "answers":ans,
      "userInfo":userInfo
    });
  }catch(error){
    console.log("Error in fetching user profile answers: ", error);
    return res.status(409).json({
      message: "Error in fetching user profile answers!",
    });
  }
}

module.exports.follow = async function(req,res){
  try {
    let whomToFollowUserId = req.body.whomToFollowUserId;
    let userId = req.body.userId;
    let user = await User.findById(userId);
    let whomToFollowUser = await User.findById(whomToFollowUserId);
    //pehle check karege ki woh already follow karta hai kya
    if(user.following.includes(whomToFollowUserId)&&whomToFollowUser.followers.includes(userId)){
      //agar already follow karta hai toh ussey remove karege aur response return karege
      let index = user.following.indexOf(whomToFollowUserId);
      user.following.splice(index,1);
      user.save();
      console.log('user following:',user.following);
      index = whomToFollowUser.followers.indexOf(userId);
      whomToFollowUser.followers.splice(index,1);
      whomToFollowUser.save();
      console.log('whomtofollow:',whomToFollowUser.followers);
      return res.status(200).send({
        message:"User unfollowed successfully",
        user:whomToFollowUser
      });
    }else{
      //agar user follow nahi karta toh follow karege
      user.following.push(whomToFollowUserId);
      user.save();
      console.log('user following:',user.following);
      whomToFollowUser.followers.push(userId);
      whomToFollowUser.save();
      console.log('whomtofollow:',whomToFollowUser.followers);
      return res.status(200).send({
        message:"User followed successfully",
        user:whomToFollowUser
      });
    }

    
  } catch (error) {
    console.log("Error in fetching follow: ", error);
    return res.status(409).json({
      message: "Error in follow",
    });
  }
}