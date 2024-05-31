// import models
const Product = require("./product.js");
const Category = require("./category.js");
const Tag = require("./tag.js");
const ProductTag = require("./productTag.js");

// sequelize associations

// Products belongsTo Category
Product.belongsTo(Category);
// Categories have many Products
Category.hasMany(Product);
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { as: ProductTag });
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { as: ProductTag });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
