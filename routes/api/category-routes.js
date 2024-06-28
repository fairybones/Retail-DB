const router = require("express").Router();
const { Category, Product } = require("../../models");

// making requests to `/api/categories` endpoint

// all categories & associated products
router.get("/", async (req, res) => {
  try {
    const fetchAll = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(fetchAll);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// find one Category by id & associated products
router.get("/:id", async (req, res) => {
  try {
    const findCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!findCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(findCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update an existing category by id
router.put("/:id", async (req, res) => {
  try {
    const editCategory = await Category.update(req.body.categoryName, {
      where: {
        id: req.params.id,
      },
    });
    if (!editCategory[0]) {
      res.status(404).json({ message: "Category requested does not exist." });
      return;
    }
    res.status(200).json(editCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete category by id value
router.delete("/:id", async (req, res) => {
  try {
    const rmCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!rmCategory) {
      res.status(404).json({ message: "No category found matching that id." });
      return;
    }
    res.status(200).json(rmCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
