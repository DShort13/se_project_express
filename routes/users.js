const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateItemId } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateItemId, updateProfile);

module.exports = router;
