const express = require("express")
const router = express.Router()
const {getAllStudents,deleteStudent,createModule,createLevel} = require("../controllers/adminController")
const {getModuleEnrollments} = require("../controllers/enrollmentController")

router.get("/students",getAllStudents)
router.delete("/students/:id",deleteStudent)
router.post("/modules",createModule)
router.post("/levels",createLevel)
router.get("/enrollments", getModuleEnrollments);
const {
  getEnrolledUsersByModule
} = require("../controllers/enrollmentController");

router.get(
  "/modules/:moduleId/enrollments",
  getEnrolledUsersByModule
);

module.exports = router;