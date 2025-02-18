import { Context } from "hono";
import { getPrisma } from "../config/prismaClient";

export async function getSubtasks(c:Context,taskId:number){
    const prisma = getPrisma(c.env.DATABASE_URL)
    try {
        const subtasks = await prisma.subtask.findMany({
            where:{taskId:taskId}
        })
        if(!subtasks){
            return false
        }
        return subtasks
    } catch (error) {
        console.log("error during getting subtasks")
        return false
    }
}

export async function addSubTask(c: Context, subtask: subtaskConstant) {
    const prisma = getPrisma(c.env.DATABASE_URL)
    try {
        const createdSubtask = await prisma.subtask.create({
            data:subtask
        })
        if(!createdSubtask){
            return false
        }
        return createdSubtask
    } catch (error) {
        console.log("error while adding subtask")
        return false
    }
}
export async function tooggleSubTask(c: Context, id: number) {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const existingsubTask = await prisma.subtask.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingsubTask) {
      return false;
    }
    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: { complete: !existingsubTask.complete },
    });
    return updatedTask;
  } catch (error) {
    console.log("error while toggling task");
    return false;
  }
}

export async function deleteSubTask(c:Context,id:number){
  const prisma = getPrisma(c.env.DATABASE_URL)
  try {
    const res = await prisma.task.delete({
      where:{id:id}
    })
    if(!res){
      return false
    }
    return true
  } catch (error) {
    console.log("error while deleting subtask")
    return false
  }
}