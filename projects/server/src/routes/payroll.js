const { payroll: payrollController } = require("../controllers");
const authValidator = require("../middleware/auth");
const router = require("express").Router();

router.get("/", authValidator.verifyToken, payrollController.generatePayroll);

module.exports = router;
