const { User } = require("../Models");
const { resSuccess, resFailure } = require("../Utils/response");
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    resSuccess(res, users, 200);
  } catch (error) {
    if (error) {
      resFailure(res, "Error", 400);
    }
    throw error;
  }
};

const getUserById = async (req, res) => {
  console.log("getUserById run");
  const { id } = req.params;
  try {
    const user = await User.findByPk(Number(id), {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      resFailure(res, "User Not Found", 400);
    }
    resSuccess(res, user, 200);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      role,
    });
    resSuccess(res, { ...user.dataValues }, 201, "Thêm Thành Công");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      resFailure(res, error.errors, 400);
    }
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  if (!id) {
    resFailure(res, "Request Invalid", 400);
  }
  try {
    const [userId] = await User.update(
      {
        firstName,
        lastName,
        email,
      },
      {
        where: { id },
      }
    );
    if (!userId) {
      resFailure(res, "User Not Found", 400);
    }
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    resSuccess(res, { ...user.dataValues }, 200, `Sửa Thành Công`);
  } catch (err) {
    if (error.name === "SequelizeValidationError") {
      resFailure(res, error.errors, 400);
    }
    console.log(error);
  }
};

// Tự Handle tiếp
const updateFieldUser = async (req, res) => {
  const id = Number(req.params.id);
  const requestData = { ...req.body };

  if (!id || !requestData) {
    resFailure(res, "Request Invalid", 400);
  }
  const user = await User.update(
    {
      ...requestData,
    },
    {
      where: {
        id,
      },
    }
  );
  if (!user) {
    resFailure(res, "User Not Found", 400);
  }
  resSuccess(res, { ...user }, 200, "Sửa Thành Công");
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await User.destroy({
      where: {
        id,
      },
    });
    if (!result) {
      resFailure(res, "User Not Found", 400);
    }
    resSuccess(res, {}, 200, "Xóa Thành Công");
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateFieldUser,
};
