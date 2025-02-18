import z from "zod"

export const taskInputs = z.object({
  task: z.object({
    title: z.string(),
    taskDescription: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    list: z.array(z.string()),
  }),
});

export const taskUpdateInputs = z.object({
  id: z.number(),
  title: z.string(),
  taskDescription: z.string(),
  date: z.string(),
  complete: z.boolean(),
  tags: z.array(z.string()),
  list: z.array(z.string()),
});

export const subtaskInputs= z.object({
  taskId: z.number(),
  detail: z.string(),
  complete: z.boolean()
})

export const deleteTaskInput = ({
  
})