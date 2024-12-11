import model from "./model.js";
export async function findAssignmentsForCourse(courseId) {
    return await model.find({ course: courseId });
}
export async function createAssignment(assignment) {
    delete assignment._id;
    return await model.create(assignment);
}
export async function deleteAssignment(assignmentId) {
    return await model.deleteOne({ _id: assignmentId });
}
export async function updateAssignment(assignmentId, assignmentUpdates) {
    return await model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}
