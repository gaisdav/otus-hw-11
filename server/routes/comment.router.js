const express = require("express");
const { ClassModel } = require("../mongoose");
const commentRouter = express.Router();

commentRouter.post("/", async (req, res) => {
  const classEntity = await ClassModel.findById(req.query.classId);
  await classEntity.comments.push(req.body);
  await classEntity.save();

  res.send(classEntity);
});

module.exports = commentRouter;
