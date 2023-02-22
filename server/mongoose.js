const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const classSchema = new mongoose.Schema({
  name: String,
  description: String,
  video: String,
  comments: [
    {
      author: String,
      text: String,
    },
  ],
});

const ClassModel = mongoose.model("ClassModel", classSchema);

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  classes: [
    {
      name: String,
      _id: String,
      description: String,
      video: String,
      comments: [{ author: String, text: String }],
    },
  ],
});

const CourseModel = mongoose.model("CourseModel", courseSchema);

// email: test@test.ts
// password: 123
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  ClassModel,
  CourseModel,
  UserModel,
};
