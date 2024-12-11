import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        available: String,
        due: String,
        points: Number,
        due_date: String,
        available_date: String,
        until_date: String
    },
    { collection: "assignments" }
);
export default schema;