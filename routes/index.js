const router = require("express").Router();
const apiRoutes = require("./api/index");
// const categoryRoutes = require("./category-routes.js");
// const productRoutes = require("./product-routes.js");
// const tagRoutes = require("./tag-routes.js");

router.use("/api", apiRoutes);
// router.use("/api/categories", categoryRoutes);
// router.use("/api/products", productRoutes);
// router.use("/api/tags", tagRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>Oops! Wrong Route</h1>");
});

module.exports = router;
