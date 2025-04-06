import { isValidObjectId } from "mongoose";
import z from "zod";



const zodObjectId = z.string().refine(val => isValidObjectId(val), {
    message: "Invalid ObjectId",
  });

export const prioritySchema = z.enum(['high', 'medium', 'low']);

export const tagSchema = z.object({
    tag: z.string()
})

export const contentSchema = z.object({
    title: z.string(),
    tags: z.array(zodObjectId),
    userid: zodObjectId,
    private: z.boolean(),
    priority: prioritySchema,
    kind: z.string()
})

export const userSchema = z.object({
    username: z.string().trim().min(3).max(50),
    password: z.string().min(3).max(50)
})

export const noteSchema = contentSchema.extend({
    note: z.string()
})

export const streamSchema = contentSchema.extend({
    link: z.string()
})


export const todoSchema = z.object({
    title: z.string(),
    desc: z.string().optional(),
    done: z.boolean().optional()
})

export const todosSchema = contentSchema.extend({
    todos: z.array(todoSchema),
})


export const linkSchema = z.object({
    hash: z.string(),
    userid: z.string()
})