const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function usermiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, JWT_USER_PASSWORD);

  if (!decoded || !decoded.id) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(401).json({
      message: "you are not signedin",
    });
  }
}

module.exports = {
  usermiddleware: usermiddleware,
};
