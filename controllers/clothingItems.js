const ClothingItem = require("../models/clothingItem");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((items) => res.status(200).send({ data: items }))
    .catch((e) =>
      res.status(500).send({ message: "Error from getClothingItem", e })
    );
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
    .catch((e) =>
      res.status(500).send({ message: "Error from createClothingItem", e })
    );
};

module.exports.deleteClothingItem = (req, res) => {
  console.log(req.params.id);

  ClothingItem.findByIdAndRemove(req.params.id)
    .then((item) => res.status(204).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: "Error from deleteClothingItem", e })
    );
};
