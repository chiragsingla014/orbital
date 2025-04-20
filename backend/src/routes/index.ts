import { Router } from "express";
import userRouter from './user';
import contentRouter from './content';
import shareRouter from "./share";
                                      
const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/content', contentRouter);
rootRouter.use('/share', shareRouter);

export default rootRouter;