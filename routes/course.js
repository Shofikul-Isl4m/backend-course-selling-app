const { Router } = require("express");
const { usermiddleware } = require("../middleware/user");
const { purchaseModel, contentModel } = require("../db");

const courseRouter = Router();

courseRouter.post("/purchase", usermiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  const purchases = await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    messsage: "you have successfully bought the course",
    purchases,
  });
});
courseRouter.get("/preview", async function (req, res) {
  const courses = await contentModel.find({});

  res.json({
    courses,
  });
});

module.exports = { courseRouter };
