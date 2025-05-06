const express = require("express");
const { courseRouter } = require("./routes/course ");
const { userRouter } = require("./routes/user ");
const userRouter = require();
const app = express();

mongoose.connct("");

app.use("api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000);
