import express from 'express'
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from 'cors';
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import "dotenv/config";
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import QuizQuestionsRoutes from "./Kanbas/QuizQuestions/routes.js";
import QuizAnswersRoutes from "./Kanbas/QuizAnswers/routes.js";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL,
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
QuizRoutes(app);
QuizQuestionsRoutes(app);
QuizAnswersRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)