const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const { authorization } = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/users", authorization, userRouter);
router.use("/items", clothingItems);

router.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
