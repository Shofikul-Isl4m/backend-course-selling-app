const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/puchase", function () {
  res.json({
    messsage: "purchase",
  });
});
courseRouter.get("/sigpreviewnin", function () {
  res.json({
    messsage: "signin",
  });
});

module.exports = { courseRouter };
