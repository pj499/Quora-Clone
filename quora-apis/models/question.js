const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    askedByName: {
      type: String,
    },
    askedByAvatar: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
