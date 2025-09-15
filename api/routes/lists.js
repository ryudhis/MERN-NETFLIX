const router = require("express").Router();
const List = require("#models/List");
const verifyToken = require("#root/utils/verifyToken.js");

//create
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create a list!");
  }
});

//update
router.patch("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this list!");
  }
});

//delete
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("List has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to delete this list!");
  }
});

//get by id
router.get("/find/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all
router.get("/", verifyToken, async (req, res) => {
  const type = req.query.type;
  const genre = req.query.genre;
  let lists = [];
  try {
    if (type === "series") {
      if (genre) {
        lists = await List.aggregate([
          { $match: { type: type, genre: genre } },
          { $sample: { size: 10 } },
        ]);
      } else {
        lists = await List.aggregate([
          { $match: { type: type } },
          { $sample: { size: 10 } },
        ]);
      }
    } else {
      if (genre) {
        lists = await List.aggregate([
          { $match: { genre: genre } },
          { $sample: { size: 10 } },
        ]);
      } else {
        lists = await List.aggregate([
          { $sample: { size: 10 } },
        ]);
      }
    }
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
