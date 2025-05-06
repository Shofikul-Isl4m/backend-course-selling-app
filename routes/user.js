const { Router } = require("express");
const userRouter = Router();
userRouter.post("/signup", function () {
  res.json({
    messsage: "signup",
  });
});
userRouter.post("/signin", function () {
  res.json({
    messsage: "signin",
  });
});
userRouter.get("/purchases", function () {
  res.json({
    messsage: "purchasses",
  });
});

module.exports = { userRouter };
