import { Hono } from 'hono'
import { cors } from "hono/cors";
import authRoute from './routes/authRoute';
import taskRoute from './routes/taskRoute';
import { tokenVerify } from './middleware/tokenVerification';
import userStr from './routes/userStrRoute';


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  "/*",
  cors({
    origin: "*", 
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);
app.use("/api/v1/task/*", tokenVerify);
app.use("/api/v1/subtask/*", tokenVerify);
app.use("/api/v1/userStr/*", tokenVerify);

app.route("/api/v1/auth/", authRoute);
app.route("api/v1/task/",taskRoute)
app.route("api/v1/subtask",taskRoute)
app.route("api/v1/userStr",userStr)



// app.get("/", async (c) => {
//   //   const prisma = getPrisma(c.env.DATABASE_URL);
//   return c.json({ message: "did it" });
// });
export default app
