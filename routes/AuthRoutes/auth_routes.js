const {
  handleUserRegistration,
  handleUserLogin,
} = require("../../controller/Auth/auth_controller");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Working" });
});

// Register Api
router.post("/register", handleUserRegistration);

// Login Api
router.post("/login", handleUserLogin);
module.exports = router;
