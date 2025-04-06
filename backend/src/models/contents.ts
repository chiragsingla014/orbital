import { model, Schema } from 'mongoose';
import { Priority, IContent, INote, IStream, ITodo, ITodos, INetwork, ContentModel, NoteModel, StreamModel, TodosModel, NetworkModel } from '../types/types';
import { User } from './user';
import { Tag } from './tags'


const baseOptions = {
  discriminatorKey: 'kind',
  collection: 'contents',
  timestamp: true
}


const ContentSchema = new Schema<IContent>({
    title: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    private: { type: Boolean, default: true },
    priority: { type: String, enum: Object.values(Priority), default: Priority.Medium },
},
baseOptions);



export const Content : ContentModel = model<IContent>('Content', ContentSchema)

const NoteSchema = new Schema<INote>({
    note: { type: String, required: true }
});


export const Note : NoteModel = Content.discriminator<INote>('note', NoteSchema)


const StreamSchema = new Schema<IStream>({
    link: { type: String, required: true }
});


export const Stream : StreamModel = Content.discriminator<IStream>('stream', StreamSchema)


const TodoItemSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    desc: { type: String, required: false },
    done: { type: Boolean, default: false }
  });
  
  const TodosSchema = new Schema<ITodos>({
    todos: { type: [TodoItemSchema], required: true }
  });


export const Todos : TodosModel = Content.discriminator<ITodos>('todos', TodosSchema)


const networkSchema = new Schema<INetwork>({
  nodes: [{ type: Schema.Types.ObjectId, ref: "Content"}]
})


export const Network : NetworkModel = Content.discriminator<INetwork>('network', networkSchema)


//export models => Content, Note, Stream, Todos, Network