const { Model, DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "last_name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email Invalidate",
          },
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        set(value) {
          if (!value) {
            value = nanoid();
          }
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "CLIENT",
      },
    },
    {
      sequelize,
      modelName: "users",
      timestamps: false,
    }
  );
  return User;
};
