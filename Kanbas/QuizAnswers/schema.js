import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
        attempt: { type: Number, default: 1 },
        score: { type: Number, default: 0 },
        answers: [{
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
            answer: { type: String, default: "" },
            isCorrect: { type: Boolean, default: false },
            pointsEarned: { type: Number, default: 0 }
        }],
        finished: { type: Boolean, default: false },
        date: { type: Date, default: Date.now }
    },
    { collection: "answers" }
);
export default schema;