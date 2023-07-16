const { auth: authController } = require("../controllers");
const authValidator = require("../middleware/auth");
const router = require("express").Router();

router.post("/login", authController.login);
router.post("/register-employee", authController.registerEmployee);
router.post("/setpassword", authController.setPassword);
router.get(
  "/loginWithToken",
  authValidator.verifyToken,
  authController.loginWithToken
);

module.exports = router;
