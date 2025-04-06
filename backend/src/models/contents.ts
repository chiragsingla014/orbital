import mongoose, { model, Schema } from 'mongoose';
import { Priority, IContent, INote, IStream, ITodo,ITodos } from '../types/types';
import { User } from './user';
import { Tag } from './tags';


const ContentSchema = new Schema<IContent>({
    title: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    private: { type: Boolean, default: true, required: true},
    priority: { type: String, enum: Object.values(Priority), default: Priority.Medium },
},
{timestamps: true});

export const Content = model<IContent>('Content', ContentSchema)

const NoteSchema = new Schema<INote>({
    note: { type: String, required: true }
});

export const Note = Content.discriminator<INote>('Note', NoteSchema)


const StreamSchema = new Schema<IStream>({
    link: { type: String, required: true }
});

export const Stream = Content.discriminator<IStream>('Stream', StreamSchema)


const TodoItemSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    done: { type: Boolean, default: false }
  });
  
  const TodoSchema = new Schema<ITodos>({
    todos: { type: [TodoItemSchema], required: true }
  });

export const Todo = Content.discriminator<ITodo>('Todo', TodoSchema)



//export Content, Note, Stream, Todo