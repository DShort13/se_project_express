const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  dislikeItem,
  likeItem,
} = require("../controllers/clothingItems");
const { authorization } = require("../middlewares/auth");

router.get("/", getClothingItems);
router.post("/", authorization, createClothingItem);
router.delete("/:itemId", authorization, deleteClothingItem);
router.put("/:itemId/likes", authorization, likeItem);
router.delete("/:itemId/likes", authorization, dislikeItem);

module.exports = router;
