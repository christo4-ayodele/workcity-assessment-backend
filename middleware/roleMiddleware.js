export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    //Make sure req.user exists (set by protet middleware)
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next(); //Role is allowed, proceed
  };
};
