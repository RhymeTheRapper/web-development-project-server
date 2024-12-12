import model from "./model.js";

export function findAllQuizzes() {
    return model.find();
}

export function findQuizzesByCourse(courseId) {
    return model.find({ course: courseId });
}

export function findQuizById(quizId) {
    return model.findById(quizId);
}

export function createQuiz(quiz) {
    // Convert boolean values to "Yes"/"No" strings
    const formattedQuiz = {
        ...quiz,
        multipleAttempts: quiz.multipleAttempts ? "Yes" : "No",
        showCorrectAnswers: quiz.showCorrectAnswers || "Immediately",
        oneQuestionAtATime: quiz.oneQuestionAtATime ? "Yes" : "No",
        webcamRequired: quiz.webcamRequired ? "Yes" : "No",
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ? "Yes" : "No",
        shuffleAnswer: quiz.shuffleAnswer ? "Yes" : "No"
    };
    
    delete formattedQuiz._id;
    return model.create(formattedQuiz);
}

export function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, { $set: quizUpdates });
}