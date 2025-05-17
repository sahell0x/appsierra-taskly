import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type:String,default:""},
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  projectId: { type: mongoose.Types.ObjectId, ref: "Project" },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },

  createdAt: { type: String },
  completedAt: { type: String, required: false },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
