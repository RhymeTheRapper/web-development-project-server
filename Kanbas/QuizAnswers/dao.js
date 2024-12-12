import { findQuestionsForQuiz } from "../QuizQuestions/dao.js";
import model from "./model.js";
import quizModel from "../Quizzes/model.js";

// Find all finished answers for a specific quiz
export async function findAnswersForQuiz(quizId) {
    return model.find({ quiz: quizId, finished: true });
}

// Find a user's answer for a specific quiz
export async function findAnswersForUser(quizId, userId) {
    return model.findOne({ quiz: quizId, user: userId });
}

// Create a new answer for a quiz
export async function createAnswer(quizId, answer) {
    return model.create({ quizId, attempt: 1, finished: false, ...answer });
}

// Delete an answer by its ID
export async function deleteAnswer(answerId) {
    return model.deleteOne({ _id: answerId });
}

// Add or update an answer for a specific question
export async function addAnswerToMap(quizId, userId, questionId, newAnswer) {
    const answer = await model.findOne({ quiz: quizId, user: userId });
    if (answer) {
        answer.answers.set(questionId, newAnswer);
        return answer.save();
    }
    return model.create({
        quiz: quizId,
        user: userId,
        attempt: 1,
        answers: { [questionId]: newAnswer },
        finished: false,
    });
}

// Increment the attempt count and calculate the score
export async function addAttempt(quizId, userId) {
    const answer = await model.findOne({ quiz: quizId, user: userId });
    if (answer) {
        answer.attempt++;
        answer.finished = true;
        answer.score = 0;

        const questions = await findQuestionsForQuiz(quizId);
        questions.forEach((question) => {
            // Find the matching answer in the answers array
            const userAnswer = answer.answers.find(a => a.questionId.toString() === question._id.toString());
            
            if (userAnswer) {
                // Check if answer is correct based on question type
                let isCorrect = false;
                if (question.type === "Fill-in-the-Blank") {
                    isCorrect = question.correctAnswers.includes(userAnswer.answer);
                } else if (question.type === "True/False") {
                    isCorrect = question.correctAnswer === (userAnswer.answer.toLowerCase() === 'true');
                } else if (question.type === "Multiple Choice") {
                    const correctOption = question.options.find(opt => opt.isCorrect);
                    isCorrect = correctOption && correctOption.text === userAnswer.answer;
                }

                // Update the answer's correctness and points
                userAnswer.isCorrect = isCorrect;
                userAnswer.pointsEarned = isCorrect ? question.points : 0;
                answer.score += userAnswer.pointsEarned;
            }
        });
        
        return answer.save();
    }
    return false;
}

// Start a new attempt for a quiz
export async function newAttempt(quizId, userId) {
    // First, get all questions for this quiz
    const questions = await findQuestionsForQuiz(quizId);
    
    // Initialize answers array with default values for each question
    const initialAnswers = questions.map(question => ({
        questionId: question._id,
        answer: "",           // Empty string as initial answer
        isCorrect: false,     // Default to false
        pointsEarned: 0      // Default to 0 points
    }));

    // Create new attempt with initialized answers
    const newAttempt = {
        quiz: quizId,
        user: userId,
        attempt: 1,          // You might want to count existing attempts and increment
        score: 0,
        answers: initialAnswers,
        finished: false,
        date: new Date()
    };

    return model.create(newAttempt);
}

// Update an existing answer
export async function updateAnswer(quizId, userId, newAnswer) {
    return model.updateOne({ quiz: quizId, user: userId }, { $set: newAnswer });
}