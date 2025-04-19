import { isValidObjectId } from "mongoose";
import z from "zod";


const zodObjectId = z.string().refine(val => isValidObjectId(val), {
    message: "Invalid ObjectId",
  });



  export const linkSchema = z.object({
      hash: z.string(),
      userid: zodObjectId,
      content: zodObjectId
  })
  