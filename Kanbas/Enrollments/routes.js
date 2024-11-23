import * as enrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app) {
    app.delete("/api/enrollments/:enrollmentId", (req, res) => {
        const { enrollmentId } = req.params;
        enrollmentsDao.deleteEnrollment(enrollmentId);
        res.sendStatus(204);
    });
    app.get("/api/enrollments", (req, res) => {
        const enrollments = enrollmentsDao.findAllEnrollments();
        res.send(enrollments);
    });
}