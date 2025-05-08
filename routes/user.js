const { Router } = require("express");
const userRouter = Router();
const { userModel, contentModel } = require("../db");
const bcrypt = require("bcrypt");
const z = require("zod");
const Jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { usermiddleware } = require("../middleware/user");

userRouter.post("/signup", async function (req, res) {
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
userRouter.post("/signin", async function (req, res) {
  const signinSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ message: "Invalid Credentials" });
  }

  const { email, password } = result.data;
  const user = await userModel.findOne({
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

userRouter.get("/purchases", usermiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  const coursesData = await contentModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });

  res.json({
    purchases,
    coursesData,
  });
});

module.exports = {
  userRouter: userRouter,
};
