const jwt = require("jsonwebtoken");
const config = require("../Config");

const EXPIRES_IN = 60 * 60 * 60 * 24;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(payload, config.secret_key, {
    expiresIn: EXPIRES_IN,
  });
  return {
    token,
    expiresIn: EXPIRES_IN,
  };
};

module.exports = {
  generateToken,
};
