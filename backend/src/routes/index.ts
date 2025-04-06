import { Router } from "express";
import { userRouter } from './user';
import { contentRouter } from './content';
                                      
export const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/content', contentRouter);