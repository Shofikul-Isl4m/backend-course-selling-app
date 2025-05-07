const express = require("express");
const { courseRouter } = require("./routes/course ");
const { userRouter } = require("./routes/user ");
const { adminRouter } = require;
const userRouter = require();
const app = express();

mongoose.connct("mongodb+srv://riaz:riaz@cluster0.0x6yiym.mongodb.net/");

app.use("api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(3000);
