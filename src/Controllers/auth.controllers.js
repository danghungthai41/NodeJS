const { User } = require("../Models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Utils/jwt");
const { resSuccess, resFailure } = require("../Utils/response");
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      resFailure(res, "Email or Password Invalid", 400);
    }
    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      resFailure(res, "Email or Password Invalid", 400);
    }
    const token = generateToken(user);
    resSuccess(res, token, 200);
  } catch (error) {
    throw error;
  }
};

const profile = (req, res) => {
  const user = req.user;
  resSuccess(res, user, 200);
};

module.exports = { login, profile };
