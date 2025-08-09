const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  answer: mongoose.Schema.Types.Mixed, // can be string or object for sub-answers
});

const ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  answers: [AnswerSchema],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", ResponseSchema);
