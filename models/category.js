const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  {
    // define table columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    // omits default 'createdAt' & 'updatedAt' fields
    timestamps: false,
    // ensures Model tableName is not altered/pluralized
    freezeTableName: true,
    // converts modelName to table_name
    underscored: true,
    modelName: "category",
  }
);

// manually make sure models & tables sync
const syncModels = async () => {
  await sequelize.sync({ force: true });
  console.log("Models synchronized successfully!");
};

syncModels();

module.exports = Category;
