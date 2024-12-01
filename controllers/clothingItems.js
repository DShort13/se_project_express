const ClothingItem = require("../models/clothingItem");
const { DEFAULT, NOT_FOUND, BAD_REQUEST } = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      console.error(err);
      res.status(NOT_FOUND).send({ message: "Item not found" });
    });
};

module.exports.createClothingItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl, ownerId } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: ownerId })
    .then((item) => {
      console.log(item);
      res.status(201).send({ data: item });
      console.log(req.user._id);
    })
    .catch((err) => {
      console.log(err.name);
      console.error(err);
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Invalid input, please try again" });
      } else {
        res
          .status(DEFAULT)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const itemId = req.params_id;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail(() => {
      const error = new Error("Clothing item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(204).send({ data: item }))
    .catch((err) => {
      console.log(err.name);
      console.error(err);
      if (err.message === "Clothing item not found") {
        res.status(NOT_FOUND).send({ message: "Clothing item not found" });
      } else if (err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Invalid input, please try again" });
      } else {
        res
          .status(DEFAULT)
          .send({ message: "An error has occurred on the server" });
      }
    });
};
