import { Hono } from "hono";
import { checkUser, createUser, signJWT, verifyJWT } from "../services/userServices";


const authRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

authRoute.post("/login", async(c)=>{
    const body:userCredentials = await c.req.json();
    const isUserExist = await checkUser(c,body.username)
    if(isUserExist && isUserExist.password == body.password){
      const token = await signJWT(c,isUserExist.username,isUserExist.id)
      if(token){
        c.status(200)
        return c.json({message:"login successful",user:isUserExist.username, token:token})
      }
    }
    c.status(403)
    return c.json({message:"login failed"})
});

authRoute.post("/signup",async(c)=>{

  const body:userCredentials = await c.req.json();
  const isUserNameAlreadyExist = await checkUser(c,body.username)

  if(isUserNameAlreadyExist){
    c.status(403)
    return c.json({message:"username already exist"})
  }

  const createdUser = await createUser(c,body)

  if(createdUser){
    const token = await signJWT(c, createdUser.username,createdUser.id);
    if(token){
      c.status(200)
      return c.json({message:"signup successful",user:createdUser.username,token:token})
    }
  }
  c.status(403)
  return c.json({message:"error will signup"})
})

authRoute.post("/validate", async (c)=>{
  const body = await c.req.json()
  const decode = await verifyJWT(c, body.token);

  if (typeof decode === "boolean" || !decode || !("user" in decode)) {
    c.status(403)
    return c.json({message:"token expired"})
  }
  c.status(200);
  return c.json({ message: "token verified", user: decode.user });
});


export default authRoute

