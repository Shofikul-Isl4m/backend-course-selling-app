const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const z = require("zod");
const Jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

userRouter.post("/signup", async function () {
  const signupSchema = z.object({
    email: z.string(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
  });
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: result.error,
    });
  }

  const { email, password, firstname, lastname } = result.data;

  const hashedPassword = await bcrypt.hash(password, 5);

  await userModel.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
  });

  res.json({
    messsage: "signup succesful",
  });
});
userRouter.post("/signin", async function () {
  const signinSchema = z.object({
    email: z.string,
    password: z.string,
  });
  const result = signinSchema.safeParse(body);

  if (!result.success) {
    res.status;
  }

  const { email, password } = result.data;
  const user = await userModel.find({
    email,
  });
  if (!user) {
    return res.status(404).json({
      message: "user does not exist",
    });
  }

  const isValidPassword = bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "password is incorrect",
    });
  }
  const token = Jwt.sign(
    {
      id: user._id,
    },
    JWT_USER_PASSWORD
  );

  res.json({
    token: token,
  });
});
userRouter.get("/purchases", function () {
  res.json({
    messsage: "purchases",
  });
});

module.exports = { userRouter };
