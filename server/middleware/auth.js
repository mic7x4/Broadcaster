import jwt from "jsonwebtoken";

require("dotenv").config();

const { JWT_SECRET } = process.env;

const tokenValidator = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      status: res.statusCode,
      message: "Access denied no token provided"
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (ex) {
    return res
      .status(400)
      .json({ status: res.statusCode, message: "Invalid token" });
  }
  return next();
};
export default tokenValidator;
