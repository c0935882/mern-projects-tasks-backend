import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 60, trim: true },
  status: { type: String, enum: ["planned","active","completed"], default: "planned" },
  description: { type: String, maxlength: 1000 }
}, { timestamps: true });

projectSchema.index({ name: 1 }, { unique: true }); // index #1

export const Project = mongoose.model("Project", projectSchema);
