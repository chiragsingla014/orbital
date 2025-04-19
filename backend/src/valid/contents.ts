import { isValidObjectId } from "mongoose";
import z from "zod";


const zodObjectId = z.string().refine(val => isValidObjectId(val), {
    message: "Invalid ObjectId",
  });

  export const prioritySchema = z.enum(['high', 'medium', 'low']);
  export const kindSchema = z.enum(['note', 'todos', 'stream', 'network']);
  export const todoSchema = z.object({
    title: z.string(),
    desc: z.string().default(''),
    done: z.boolean().optional()
})
  

export const contentSchema = z.object({
    title: z.string().trim().min(1),
    tags: z.array(z.string()).optional(),
    userid: zodObjectId.optional(),
    private: z.boolean().optional(),
    priority: prioritySchema.optional(),
    kind: kindSchema
})

export const networkSchema = contentSchema.extend({
    nodes: z.array(zodObjectId),
    kind: z.literal('network')
})


export const noteSchema = contentSchema.extend({
    note: z.string(),
    kind: z.literal('note')
})

export const streamSchema = contentSchema.extend({
    link: z.string().trim().min(1),
    kind: z.literal('stream')
})


export const todosSchema = contentSchema.extend({
    todos: z.array(todoSchema),
    kind: z.literal('todos')
})
  


export const ContentUnionSchema = z.discriminatedUnion('kind', [networkSchema, noteSchema, streamSchema, todosSchema])




export const networkUpdateSchema = networkSchema.partial({title:true, tags:true, userid:true, private:true, priority:true, nodes:true});
export const noteUpdateSchema = noteSchema.partial({title:true, tags:true, userid:true, private:true, priority:true, note:true});
export const streamUpdateSchema = streamSchema.partial({title:true, tags:true, userid:true, private:true, priority:true, link:true});
export const todosUpdateSchema = todosSchema.partial({title:true, tags:true, userid:true, private:true, priority:true, todos:true});
export const UpdateUnionSchema = z.discriminatedUnion('kind', [networkUpdateSchema, noteUpdateSchema, streamUpdateSchema, todosUpdateSchema])
