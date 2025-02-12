import passport from "passport";

const authJWT = (req, res, next) => {
  passport.authenticate(
    "access-token",
    { session: false },
    (err, user, info) => {
      if (err) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      if (info && info.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Access Token expired" });
      }
      if (info && info.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = user; // Attach the user to the request object
      next();
    }
  )(req, res, next);
};

export { authJWT };
