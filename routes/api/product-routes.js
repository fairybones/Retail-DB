const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// requests to `/api/products` endpoint

// GET all products
router.get("/", async (req, res) => {
  try {
    const fetchProducts = await Product.findAll(req, {
      include: [{ model: Category }, { model: Tag }],
    });
    res.json(fetchProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one Product by id & associated Category + Tag data
router.get(":/id", async (req, res) => {
  try {
    const findProduct = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!findProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(findProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
    // destructure the req body
    const { productName, price, stock, tagIds } = req.body;
    const newProduct = await Product.create({ product_name, price, stock });

    if (tagIds && tagIds.length) {
      const productTagIdArr = tagIds.map((tag_id) => ({
        product_id: newProduct.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({ product_id: req.params.id, tag_id }));

      await Promise.all([
        ProductTag.destroy({
          where: { id: productTags.map(({ id }) => id) },
        }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one product by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!deletedProduct) {
      res.status(404).json({ message: "No product found matching id." });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
