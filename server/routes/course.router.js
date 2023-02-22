const express = require("express");
const { CourseModel } = require("../mongoose");
const courseRouter = express.Router();

courseRouter.get("/:id", async (req, res) => {
  const course = await CourseModel.findById(req.params.id);
  res.send(course);
});

courseRouter.get("/", async (req, res) => {
  const courses = await CourseModel.find();
  res.send(courses);
});

courseRouter.post("/", async (req, res) => {
  const courseEntity = new CourseModel({ ...req.body, classes: [] });
  await courseEntity.save();
  res.send(courseEntity);
});

module.exports = courseRouter;
