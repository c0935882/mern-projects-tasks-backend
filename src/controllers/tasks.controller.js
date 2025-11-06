import createError from "http-errors";
import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import { Project } from "../models/project.model.js";

export const createTask = async (req,res,next)=>{ try{
  const { projectId } = req.body;
  if(!projectId || !mongoose.isValidObjectId(projectId)) throw createError(400,"Valid projectId required");
  const parent = await Project.findById(projectId);
  if(!parent) throw createError(404,"Parent project not found");
  const doc = await Task.create(req.body);
  res.status(201).json(doc);
}catch(e){ next(e);}};

export const listTasks = async (req,res,next)=>{ try{
  const q = {};
  if(req.query.projectId) q.projectId = req.query.projectId;
  if(req.query.state) q.state = req.query.state;
  const docs = await Task.find(q).sort({createdAt:-1});
  res.json(docs);
}catch(e){ next(e);}};

export const getTask = async (req,res,next)=>{ try{
  const doc = await Task.findById(req.params.id);
  if(!doc) throw createError(404,"Task not found");
  res.json(doc);
}catch(e){ next(e);}};

export const updateTask = async (req,res,next)=>{ try{
  if(req.body.projectId){
    const ok = await Project.exists({_id:req.body.projectId});
    if(!ok) throw createError(400,"Target projectId does not exist");
  }
  const doc = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
  if(!doc) throw createError(404,"Task not found");
  res.json(doc);
}catch(e){ next(e);}};

export const deleteTask = async (req,res,next)=>{ try{
  const doc = await Task.findByIdAndDelete(req.params.id);
  if(!doc) throw createError(404,"Task not found");
  res.status(204).send();
}catch(e){ next(e);}};
