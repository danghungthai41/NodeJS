const resSuccess = (res, data, code, message = "Success") => {
  let result = { success: true };
  if (code) {
    result.statusCode = code;
  }

  res.status(code).json({ data, ...result, message });
};

const resFailure = (res, err, code) => {
  const result = { sucess: false };
  let errors = [];

  if (code) {
    result.statusCode = code;
  }
  if (Array.isArray(err) && err.length > 0) {
    errors = err.map((e) => e.message);
  } else if (typeof err === "object" && err.message) {
    errors = [err.message];
  } else {
    errors = [err];
  }

  return res.status(code).json({ errors, ...result });
};

module.exports = { resSuccess, resFailure };
