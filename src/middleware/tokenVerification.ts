import { Context, Next } from 'hono';
import { verifyJWT } from '../services/userServices';

declare module "hono" {
  interface ContextVariableMap {
    userId: number;
  }
}

export async function tokenVerify(c:Context,next:Next){

    const authHeader = c.req.header("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return c.text("Unauthorized", 401);
      }

       const token = authHeader.split(" ")[1];

       try {
        const isvalid = await verifyJWT(c,token)
         if (
           typeof isvalid === "boolean" ||
           !isvalid ||
           !("userId" in isvalid)
         ) {
           c.status(403);
           return c.json({ message: "Invalid token" });
         }
        if (isvalid.userId){
          const id = Number(isvalid.userId);
          c.set("userId", id);
        } 
        await next()
       } catch (error) {
        return c.text("token verification failed",403)
       }
}