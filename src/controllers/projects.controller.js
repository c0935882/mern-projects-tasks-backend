import createError from "http-errors";
import { Project } from "../models/project.model.js";

export const createProject = async (req,res,next)=>{ try{
  const doc = await Project.create(req.body);
  res.status(201).json(doc);
}catch(e){ next(e);}};

export const listProjects = async (_req,res,next)=>{ try{
  const docs = await Project.find().sort({createdAt:-1});
  res.json(docs);
}catch(e){ next(e);}};

export const getProject = async (req,res,next)=>{ try{
  const doc = await Project.findById(req.params.id);
  if(!doc) throw createError(404,"Project not found");
  res.json(doc);
}catch(e){ next(e);}};

export const updateProject = async (req,res,next)=>{ try{
  const doc = await Project.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
  if(!doc) throw createError(404,"Project not found");
  res.json(doc);
}catch(e){ next(e);}};

export const deleteProject = async (req,res,next)=>{ try{
  const doc = await Project.findByIdAndDelete(req.params.id);
  if(!doc) throw createError(404,"Project not found");
  res.status(204).send();
}catch(e){ next(e);}};
