import jwt from "jsonwebtoken";

export default function authMiddleWare(req, res, next) {
  let token;

  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  } else {
    return res.status(401).json({
      message: "Authorization header not found",
    });
  }
}
