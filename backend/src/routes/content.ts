import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import { Content, Note, Todos, Stream, Network } from "../models/contents";
import { ContentUnionSchema } from "../valid/valid";
import { IContent, AllModels, ContentModel } from "../types/types";
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
                items = await Model.find().sort(sortOrder).skip(skip).limit(limitn);
                break;
            case 'note':
                Model = Note;
                items = await Model.find().sort(sortOrder).skip(skip).limit(limitn);
                break;
            case 'todos':
                Model = Todos;
                items = await Model.find().sort(sortOrder).skip(skip).limit(limitn);
                break;
            case 'stream':
                Model = Stream;
                items = await Model.find().sort(sortOrder).skip(skip).limit(limitn);
                break;
            case 'network':
                Model = Network;
                items = await Model.find().sort(sortOrder).skip(skip).limit(limitn);
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
        const { success, data } = ContentUnionSchema.safeParse(req.body);
        if(!success){
            res.status(400).json({ error: "invalid data"});
                return;
        }
        let content;
        switch(data.kind){
            case 'network':
                content = await Network.create(data);
                break;
            case 'note':
                content = await Network.create(data);
                break;
            case 'todos':
                content = await Network.create(data);
                break;
            case 'stream':
                content = await Network.create(data);
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
contentRouter.post('/:id',authMiddleware, async (req : Request, res : Response) => {
    try{
        const contentid :string = req.params.id;
        
    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

// put (all data) /:id 
contentRouter.post('/:id',authMiddleware, async (req : Request, res : Response) => {
    try{
        const contentid : string = req.params.id;

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});


//patch (some data) /:id
contentRouter.post('/:id',authMiddleware, async (req : Request, res : Response) => {
    try{
        const contentid : string = req.params.id;

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

// delete /:id
contentRouter.post('/:id',authMiddleware, async (req : Request, res : Response) => {
    try{
        const contentid : string = req.params.id;

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

export default contentRouter;