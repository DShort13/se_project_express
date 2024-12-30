const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { authorization } = require("../middlewares/auth");

router.get("/me", authorization, getCurrentUser);
router.patch("/me", authorization, updateProfile);

module.exports = router;
