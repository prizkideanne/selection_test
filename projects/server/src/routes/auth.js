const { auth: authController } = require("../controllers");
const authValidator = require("../middleware/auth");
const router = require("express").Router();

router.post("/login", authController.login);
router.post(
  "/register-employee",
//   authValidator.verifyToken,
  authController.registerEmployee
);

module.exports = router;
