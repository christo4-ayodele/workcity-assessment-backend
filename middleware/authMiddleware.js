import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if the Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
