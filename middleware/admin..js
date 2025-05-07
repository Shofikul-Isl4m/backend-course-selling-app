const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminmiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

  if (!decoded || !decoded.id) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(401).json({
      message: "you are not signed in",
    });
  }
}

module.exports = {
  adminmiddleware: adminmiddleware,
};
