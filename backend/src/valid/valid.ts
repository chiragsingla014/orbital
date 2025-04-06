import { isValidObjectId } from "mongoose";
import z from "zod";


const zodObjectId = z.string().refine(val => isValidObjectId(val), {
    message: "Invalid ObjectId",
  });

export const prioritySchema = z.enum(['high', 'medium', 'low']);
export const kindSchema = z.enum(['note', 'todos', 'stream', 'network']);

export const tagSchema = z.object({
    tag: z.string()
})

export const contentSchema = z.object({
    title: z.string().trim().min(1),
    tags: z.array(zodObjectId),
    userid: zodObjectId,
    private: z.boolean(),
    priority: prioritySchema,
    kind: kindSchema
})

export const networkSchema = contentSchema.extend({
    nodes: z.array(zodObjectId),
    kind: z.literal('network')
})

export const userSchema = z.object({
    username: z.string().trim().min(3).max(50),
    password: z.string().min(3).max(50)
})

export const noteSchema = contentSchema.extend({
    note: z.string(),
    kind: z.literal('note')
})

export const streamSchema = contentSchema.extend({
    link: z.string().trim().min(1),
    kind: z.literal('stream')
})


export const todoSchema = z.object({
    title: z.string(),
    desc: z.string().default(''),
    done: z.boolean().optional()
})

export const todosSchema = contentSchema.extend({
    todos: z.array(todoSchema),
    kind: z.literal('todos')
})


export const linkSchema = z.object({
    hash: z.string(),
    userid: zodObjectId,
    content: zodObjectId
})


export const ContentUnionSchema = z.discriminatedUnion('kind', [networkSchema, noteSchema, streamSchema, todosSchema])