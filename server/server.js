const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("express");
const classRouter = require("./routes/class.router");
const commentRouter = require("./routes/comment.router");
const courseRouter = require("./routes/course.router");
const authRouter = require("./routes/auth");
const { UserModel } = require("./mongoose");

main().catch((err) => console.log("err", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  const user = await UserModel.findOne({ email: "test@test.ts" });

  if (!user) {
    // email: test@test.ts
    // password: 123
    const user = new UserModel({ email: "test@test.ts", password: "123" });
    await user.save();
  }
}

require("./auth");

const app = express();
const port = 3001;

app.use(cors());
app.use(json());

app.use(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  courseRouter
);
app.use(
  "/classes",
  passport.authenticate("jwt", { session: false }),
  classRouter
);
app.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRouter
);

app.use("/login", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
