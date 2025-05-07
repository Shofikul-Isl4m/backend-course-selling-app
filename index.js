require("dotenv").config();
const express = require("express");
const { courseRouter } = require("./routes/course ");
const { userRouter } = require("./routes/user ");
const { adminRouter } = require;
const userRouter = require();
const app = express();
app.use(express.json());

app.use("api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  await mongoose.connct(process.env.DATABASE_URL);
  app.listen(3000);
  console.log("listening on port 3000");
}

main();
