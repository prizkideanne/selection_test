const { attendance: attendanceController } = require("../controllers");
const authValidator = require("../middleware/auth");
const router = require("express").Router();

router.post(
  "/in",
  authValidator.verifyToken,
  attendanceController.employeeClockIn
);
router.post(
  "/out",
  authValidator.verifyToken,
  attendanceController.employeeClockOut
);

router.get(
  "/today",
  authValidator.verifyToken,
  attendanceController.getTodayAttendance
);

module.exports = router;
