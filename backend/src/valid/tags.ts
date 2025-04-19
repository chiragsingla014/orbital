import { isValidObjectId } from "mongoose";
import z from "zod";


const zodObjectId = z.string().refine(val => isValidObjectId(val), {
    message: "Invalid ObjectId",
  });


  export const tagSchema = z.object({
    tag: z.string()
})