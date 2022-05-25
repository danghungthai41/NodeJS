require("dotenv").config();

module.exports = {
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_ROOT_USER,
  db_password: process.env.DB_ROOT_PASSWORD,
  db_dialect: process.env.DB_DIALECT,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  secret_key: process.env.SECRET_KEY
};
