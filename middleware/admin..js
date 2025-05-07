const jwt = require("jsonwebtoken");

function adminmiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, "adminriaz");

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
