const express = require("express");
const router = express.Router();

const { getTotalStudents } = require("../controllers/userController");
const {
  buyModule,
  getMyModules
} = require("../controllers/enrollmentController");



router.get("/students/count", getTotalStudents);


router.post("/buy", buyModule);
router.get("/my-modules", getMyModules);


module.exports = router;
