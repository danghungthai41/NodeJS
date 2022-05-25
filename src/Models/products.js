const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {}
  Product.init(
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      
      description: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          max: {
            msg: "",
            args: 50,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "products",
      timestamps: false,
    }
  );
};
