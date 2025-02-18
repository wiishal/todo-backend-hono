interface userCredentials{
    username:string,
    password:string
}

interface DecodedToken {
  role:string,
  user:string,  
  userId: number;
}

interface taskInput {
  title: string;
  taskDescription: string;
  date: string;
  complete: boolean;
  list:  string[]
  tags: string[]
}

interface subtaskConstant {
  id: number;
  taskId: number;
  detail: string;
  complete: boolean;
}
interface tasksConstant extends taskInput {
  userId: number;
}
interface tasksDBConstant extends tasksConstant {
  id: number;
}