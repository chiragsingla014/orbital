import { isValidObjectId } from "mongoose";
import z from "zod";


const zodObjectId = z.string().refine(val => isValidObjectId(val), {
    message: "Invalid ObjectId",
  });



  export const userSchema = z.object({
      username: z.string().trim().min(3).max(50),
      password: z.string().min(3).max(50)
  })
  