const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  dislikeItem,
  likeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateCreateItem, validateId } = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", auth, validateCreateItem, createClothingItem);
router.delete("/:itemId", auth, validateId, deleteClothingItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
