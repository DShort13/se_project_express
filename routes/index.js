const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItems");
const { BAD_REQUEST } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItems);

router.use((req, res) => {
  res.status(BAD_REQUEST).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
