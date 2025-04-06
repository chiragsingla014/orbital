import { Router } from "express";
import userRouter from './user';
import contentRouter from './content';
                                      
const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/content', contentRouter);

export default rootRouter;