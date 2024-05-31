const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
    {
        // define table columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        // omits default 'createdAt' & 'updatedAt' fields
        timestamps: false,
        // ensures Model tableName is not altered/pluralized
        freezeTableName: true,
        // converts modelName to table_name
        underscored: true,
        modelName: 'category'
    }
);

module.exports = Category;