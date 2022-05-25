const jwt = require("jsonwebtoken");
const config = require("../Config");
const { resFailure } = require("../Utils/response");
const { User } = require("../Models");
const extractTokenFromHeaderString = (token) => {
  if (!token) {
    return [null, "Token Is Required"];
  }
  const parts = token.split(" ");

  if (
    parts.length < 2 ||
    parts[0].toLowerCase() !== "bearer" ||
    parts[1] === ""
  ) {
    return [null, "Token Invalid"];
  }
  return [parts[1], null];
};

const authenticate = async (req, res, next) => {
  try {
    const [token, error] = extractTokenFromHeaderString(
      req.header("Authorization")
    );
    if (error) {
      resFailure(res, error, 401);
    }
    const payload = jwt.verify(token, config.secret_key);
    if (payload.exp < Date.now / 1000) {
      resFailure(res, "Token is Expired", 401);
    }

    const { id } = payload;
    const user = await User.findByPk(id);

    //Bước này để controller tiếp theo có thể nhận đc thông tin thông qua req
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

const authorize =
  (...allowRoles) =>
  (req, res, next) => {
    const { role } = req.user;
    const isAllow = allowRoles.some((allowRole) => allowRole === role);
    if (!isAllow) {
      return resFailure(res, "Forbidden", 403);
    }
    next();
  };

module.exports = {
  authenticate,
  authorize,
};
