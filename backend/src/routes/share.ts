import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import { Content, Note, Todos, Stream, Network } from "../models/contents";
const shareRouter = Router();



shareRouter.get('/:id', async (req : Request, res : Response) => {
    const content = await Content.findById(req.params.id).populate('tags');
    if (content?.kind === 'network') {
        await content.populate({
          path: 'nodes',
          match: { private: false },
        });
    }
    if (!content || content.private) {
        res.status(404).json({ error: "Not found" });
        return;
    }
    res.status(201).json(content);
    return;
})




export default shareRouter;