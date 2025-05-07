const { Router } = require("express");
const adminRouter = Router();
const { adminModel, contentModel } = require("../db");
const bcrypt = require("bcrypt");
const z = require("zod");
const Jwt = require("jsonwebtoken");
const { adminmiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
  const signupSchema = z.object({
    email: z.string(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
  });
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      messege: "invalid credentials",
      error: result.error,
    });
  }
  const { email, password, firstname, lastname } = result.data;
  try {
    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "user already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    await adminModel.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });
    res.status(201).json({
      messsage: "signup succesful",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});
adminRouter.post("/signin", async function () {
  const signinSchema = z.object({
    email: z.string,
    password: z.string,
  });
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ message: "Invalid Credentials" });
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

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "password is incorrect",
    });
  }
  const token = Jwt.sign(
    {
      id: user._id,
    },
    "riazadmin"
  );

  res.json({
    token: token,
  });
});

adminRouter.post("/course", adminmiddleware, async function (req, res) {
  const adminId = req.id;

  const { title, discription, imageurl, price, creatorId } = req.body;

  const course = await contentModel.create({
    title,
    discription,
    imageurl,
    price,
    creatorId: adminId,
  });

  res.json({
    courseId: course._id,
  });
});
adminRouter.put("/course", adminmiddleware, async function (req, res) {
  const adminId = req.id;

  const { title, discription, imageurl, price, courseId } = req.body;

  const course = await contentModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      discription,
      imageurl,
      price,
    }
  );

  res.json({
    message: "course updated",
  });
});
