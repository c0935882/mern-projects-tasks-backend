import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  title: { type: String, required: true, minlength: 3, maxlength: 100, trim: true },
  description: { type: String, maxlength: 2000 },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  state: { type: String, enum: ["todo","doing","done"], default: "todo" },
  dueDate: {
    type: Date,
    validate: {
      validator: v => !v || new Date(v).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0),
      message: "dueDate must be today or later"
    }
  }
}, { timestamps: true });

taskSchema.index({ projectId: 1, state: 1 });            // index #2
taskSchema.index({ title: "text", description: "text" }); // bonus text index

export const Task = mongoose.model("Task", taskSchema);
