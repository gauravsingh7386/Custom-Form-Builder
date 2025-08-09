const mongoose = require("mongoose");

const SubQuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  imageUrl: String,
});

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["categorize", "cloze", "comprehension"],
    required: true,
  },
  questionText: String,
  imageUrl: String,
  options: [String],          // For categorize or cloze if needed
  answer: mongoose.Schema.Types.Mixed,
  passage: String,
  categories: [String],
  // Add subQuestions only for comprehension type
  subQuestions: [SubQuestionSchema],
});

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headerImage: String,
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", FormSchema);
