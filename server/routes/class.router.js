const express = require("express");
const classRouter = express.Router();
const { ClassModel, CourseModel } = require("../mongoose");

classRouter.get("/:id", async (req, res) => {
  const classObj = await ClassModel.findById(req.params.id);

  if (!classObj) {
    res.sendStatus(404);
  }

  res.send(classObj);
});

classRouter.post("/", async (req, res) => {
  const newClass = new ClassModel({ ...req.body, comments: [] });
  await newClass.save();

  const course = await CourseModel.findById(req.query.courseId);
  await course.classes.push(newClass);
  await course.save();

  res.send(newClass);
});

module.exports = classRouter;
