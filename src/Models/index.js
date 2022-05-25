const { Sequelize } = require("sequelize");
const { db_password, db_dialect, db_host, db_port } = require("../Config");
const config = require("../Config");
const User = require("./users");

//Object relational mapping
const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_password,
  {
    dialect: config.db_dialect,
    host: config.db_host,
    port: config.db_port,
  }
);
const db = {};

db.User = User(sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
