import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
}
export function deleteEnrollment(enrollmentId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment._id !== enrollmentId
    );
}
export function findAllEnrollments() {
    return Database.enrollments;
}