import { JWTPayload } from "hono/utils/jwt/types";
import { getPrisma } from "../config/prismaClient";
import { sign, verify } from "hono/jwt";

export const checkUser = async (c: any,user_name:string)=>{
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const user = await prisma.user.findUnique({
      where: {
        username: user_name,
      },
    });

     return user || false;

  } catch (error) {
    console.log("error while checking creadential")
    return false
  }
    
}

export const createUser = async (c: any, userCredentials: userCredentials) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const user = await prisma.user.create({
      data: {
        username: userCredentials.username,
        password: userCredentials.password,
        lists:[],
        tags:[]
      },
      
    });

  return user || false

  } catch (error) {

    console.log("error while creating new user")
    return false
  }
};

  export const signJWT = async (c:any,username:string,userId:number)=>{
    const payload = {
      role:"user",
      user:username,
      userId:userId
    }
    try {
      const token = await sign(payload,c.env.JWT_SECRET)
      return token || false
    } catch (error) {
      console.log("error while signing token")
      return false
    }
  }

export const verifyJWT = async (
  c: any,
  userToken: string
): Promise<JWTPayload | boolean> => {
  try {
    const decode = await verify(userToken, c.env.JWT_SECRET);
    return decode || false;
  } catch (error) {
    console.log("error while signing token");
    return false;
  }
};


