import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import { Content, Note, Todos, Stream, Network } from "../models/contents";
import { ContentUnionSchema, UpdateUnionSchema } from "../valid/contents";
import { IContent, AllModels, ContentModel, StreamModel, TAllContents } from "../types/contents";
import { Tag } from "../models/tags";
import { Types } from "mongoose";
const contentRouter = Router();


const ALLOWED_TYPES: Record<string, AllModels >= {
    'content' : Content,
    'note' : Note,
    'todos' : Todos,
    'stream' : Stream,
    'network' : Network
}
//TODO
// get all
// get / ?kind=....&page=....&sort=....
contentRouter.get('/',authMiddleware, async (req : Request, res : Response) => {
    try{
        const { kind="content" , page = "1", limit = "20", sort = "createdAt_desc"} = req.query as { kind? : string, page? : string, limit? : string, sort? : string};
        const pagen = Math.max(parseInt(page, 10), 1);
        const limitn = Math.min(Math.max(parseInt(limit, 10), 1), 20);
        const skip = (pagen - 1)*limitn;

        const [sortField, sortOrder = "desc"] = sort.split("_");
        const sortobj : Record<string, -1|1> = {
            [sortField]: sortOrder === 'desc' ? -1 : 1,
        }

        let Model : AllModels = Content;
        if(!(kind in ALLOWED_TYPES)){
            res.status(400).json({error : "invalid kind of model"});
            return;
        }
        let items;
        switch(kind){
            case 'content':
                Model = Content;
                items = await Model.find({userid : req.body.userid}).sort(sortOrder).skip(skip).limit(limitn).populate('tags');
                break;
            case 'note':
                Model = Note;
                items = await Model.find({userid : req.body.userid}).sort(sortOrder).skip(skip).limit(limitn).populate('tags');
                break;
            case 'todos':
                Model = Todos;
                items = await Model.find({userid : req.body.userid}).sort(sortOrder).skip(skip).limit(limitn).populate('tags');
                break;
            case 'stream':
                Model = Stream;
                items = await Model.find({userid : req.body.userid}).sort(sortOrder).skip(skip).limit(limitn).populate('tags');
                break;
            case 'network':
                Model = Network;
                items = await Model.find({userid : req.body.userid}).sort(sortOrder).skip(skip).limit(limitn).populate('tags');
                break;
        }

        res.status(200).json(items);
        return;

    }catch(err : any ){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

//post all
// post / ?type=....
contentRouter.post('/',authMiddleware, async (req : Request, res : Response) => {
    try{
        const parsed = ContentUnionSchema.safeParse(req.body);
        if(!parsed.success){
            res.status(400).json({ error: "invalid data"});
            // @ts-ignore
            console.log(parsed.error.errors);
            return;
        }
        const tags: string[] = [];

        for (const item of parsed.data.tags ?? []) {
        let tag = await Tag.findOne({ tag: item });
        if (!tag) {
            tag = await Tag.create({ tag: item });
        }
        tags.push(tag._id as unknown as string);
        }

        (parsed.data as TAllContents).tags = tags;
            
        let content;
        switch(parsed.data.kind){
            case 'network':
                content = await Network.create(parsed.data);
                break;
            case 'note':
                content = await Note.create(parsed.data);
                break;
            case 'todos':
                content = await Todos.create(parsed.data);
                break;
            case 'stream':
                content = await Stream.create(parsed.data);
                break;
        }
        res.status(200).json(content);


    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

//get /:id
contentRouter.get('/:id',authMiddleware, async (req : Request, res : Response) => {
    try{
        const contentid :string = req.params.id;
        const content = await Content.findOne({_id: contentid, userid: req.body.userid}).populate('tags');
        if(!content){
            res.status(404).json({error: "not found"});
            return;
        }
        res.status(200).json(content);
        return;
    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});



//patch (some data) /:id
contentRouter.patch('/:id',authMiddleware, async (req : Request, res : Response) => {
    try{
        const contentid : string = req.params.id;
        const { success, data} = UpdateUnionSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({error: "invalid data"});
            return;
        }
        let content = await Content.findById(contentid);
        if(!content){
            res.status(404).json({error: "invalid id"});
            return;
        }
        if(content.userid != req.body.userid){
            res.status(411).json({error:"invalid id"});
            return;
        }
        const tags: string[] = [];

        for (const item of data.tags ?? []) {
        let tag = await Tag.findOne({ tag: item });
        if (!tag) {
            tag = await Tag.create({ tag: item });
        }
        tags.push(tag._id as unknown as string);
        }

        (data as TAllContents).tags = tags;
            

        switch(data.kind){
            case 'network':
                content = await Network.findByIdAndUpdate(contentid, data, { new: true });
                break;
            case 'note':
                content = await Note.findByIdAndUpdate(contentid, data, { new: true });
                break;
            case 'todos':
                content = await Todos.findByIdAndUpdate(contentid, data, { new: true });
                break;
            case 'stream':
                content = await Stream.findByIdAndUpdate(contentid, data, { new: true });
                break;
        }
        res.status(201).json(content);
        return;
        

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

// delete /:id
contentRouter.delete('/:id',authMiddleware, async (req : Request, res : Response) => {
    try{
        const contentid : string = req.params.id;
        let content = await Content.findById(contentid);
        if(!content){
            res.status(404).json({error: "invalid id"});
            return;
        }
        if(content.userid != req.body.userid){
            res.status(411).json({error:"invalid id"});
            return;
        }
        const final = await Content.findByIdAndDelete(contentid);
        res.status(201).json({message: "deleted successfully"});
        return;
        

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

export default contentRouter;