const ClothingItem = require("../models/clothingItem");
const { DEFAULT, NOT_FOUND, BAD_REQUEST } = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
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
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("Clothing item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
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

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Clothing item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
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

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Clothing item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
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
