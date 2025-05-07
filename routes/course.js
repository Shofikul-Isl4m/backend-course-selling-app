const { Router } = require("express");
const { usermiddleware } = require("../middleware/user");
const { purchaseModel, contentModel } = require("../db");

const courseRouter = Router();

courseRouter.post("/puchase", usermiddleware, async function () {
  const userId = req.userId;
  const courseId = req.body.courseId;

  const purchases = await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    messsage: "you have successfully bought the course",
  });
});
courseRouter.get("/preview", async function () {
  const courses = contentModel.find({});

  res.json({
    courses,
  });
});

module.exports = { courseRouter };
