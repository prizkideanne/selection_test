const { admin: adminController } = require("../controllers");
const router = require("express").Router();

router.get("/getAllUser", adminController.getAllUsers);

module.exports = router;
