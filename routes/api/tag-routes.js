const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
router.get("/", async (req, res) => {
  try {
    const fetchTags = await Tag.findAll(req, {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(fetchTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const findTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!findTag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.json(findTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      name: req.body.tagName,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const editTag = await Tag.update(
      { name: req.body.tagName },
      { where: { id: req.params.id } }
    );
    res.status(200).json(editTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// remove a tag by id
router.delete("/:id", async (req, res) => {
  try {
    const rmTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(rmTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
