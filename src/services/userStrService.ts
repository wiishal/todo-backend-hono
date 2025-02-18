import { Context } from "hono";
import { getPrisma } from "../config/prismaClient";

let tagCount:number = 0;

export async function getUserTaskStr(c: Context, id: number) {
  if(tagCount > 5) return false 
  const prisma = getPrisma(c.env.DATABASE_URL);
  
  try {
    const userStr = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        lists: true,
        tags: true,
      },
    });

    if (!userStr) {
      return false;
    }
    tagCount = userStr.tags.length
    return userStr;
  } catch (error) {
    console.log("error while geting userStr");
    return false;
  }
}

export async function addtag(c: Context, tag: string, user:number) {
  
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const responce = await prisma.user.update({
        where:{
            id:user
        },
        data:{
           tags:{
            push:tag
           }
        }
    })
    if(!responce) return false
    return true
  } catch (error) {
    console.log("error while adding tag",error)
    return false
  }
}

export async function getTagTask(c:Context,userId:number,tag:string) {
  const prisma = getPrisma(c.env.DATABASE_URL)
  try {
    const tasks = await prisma.task.findMany({
     where:{
      userId:userId,
      tags:{
        has:tag
      }
     }
    })
    return tasks || false
  } catch (error) {
    console.log("error while getting tagged task")
    return false
  }
}

export async function getListTask(c: Context, userId: number, list: string) {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
        list: {
          has: list,
        },
      },
    });
    return tasks || false;
  } catch (error) {
    console.log("error while getting list task");
    return false;
  }
}