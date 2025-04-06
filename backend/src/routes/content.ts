import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";

const contentRouter = Router();

//TODO
// get all ?kind=
contentRouter.get('/',authMiddleware, async (req : Request, res : Response) => {

    try{

    }catch(err : any ){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

//post all
contentRouter.post('/',authMiddleware, async (req : Request, res : Response) => {
    try{

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

//get /id
contentRouter.post('/',authMiddleware, async (req : Request, res : Response) => {
    try{

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

// delete /id
contentRouter.post('/',authMiddleware, async (req : Request, res : Response) => {
    try{

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});


//update /id
contentRouter.post('/',authMiddleware, async (req : Request, res : Response) => {
    try{

    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

export default contentRouter;