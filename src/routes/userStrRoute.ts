import { Hono } from "hono";
import { addtag, getListTask, getTagTask, getUserTaskStr } from "../services/userStrService";

const userStr = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userStr.get("/userTaskStr",async(c)=>{
  const user = c.get("userId");
  const userStr = await getUserTaskStr(c,user);
  if(!userStr){
    c.status(404)
    return c.json({message:"user Str not found"})
  }
  c.status(200)
  return c.json({userStr:userStr,message:"userStr fetch successfully"})
})

userStr.post("/addTag",async(c)=>{
    const user = c.get("userId");
    const body = await c.req.json()
    const res = await addtag(c,body.tag,user)
    if(!res){
        c.status(403)
        return c.json({message:"something went wrong while adding tag"})
    }
    c.status(200)
    return c.json({message:"tag added successfully", tag:body.tag})
})


userStr.get("/tag/:tag",async(c)=>{
    const tag = c.req.param('tag')
    const userID = c.get("userId")
    const taskArr = await getTagTask(c,userID,tag)
    if (!taskArr) {
      c.status(404);
      return c.json({ message: "error occure during getting tagged task" });
    }
    c.status(200)
    return c.json({
      message: "fetched tagged tasks successfully",
      tasks: taskArr
    });
})

userStr.get("/list/:list", async (c) => {
  const list = c.req.param("list");
  const userID = c.get("userId");
  const taskArr = await getListTask(c, userID, list);
  if (!taskArr) {
    c.status(404);
    return c.json({ message: "error occure during getting list task" });
  }
  c.status(200);
  return c.json({
    message: "fetched list tasks successfully",
    tasks: taskArr,
  });
});
export default userStr