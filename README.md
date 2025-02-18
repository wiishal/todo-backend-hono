# 📌 Todo Backend – Hono 🚀  

A **lightweight, high-performance** Todo backend built using **Hono, TypeScript, Prisma, and PostgreSQL**, designed for fast API responses and seamless integration.

## ✨ Features  

✅ **Hono-powered API** for minimal overhead & fast routing  
✅ **Prisma ORM** for efficient database management  
✅ **PostgreSQL** as the database for scalability & performance  
✅ **JWT Authentication** for secure access  
✅ **Cloudflare Workers Integration** (if applicable)  

## ⚙️ Tech Stack  

- **Backend:** Hono, TypeScript, Node.js  
- **Database:** Prisma ORM, PostgreSQL  
- **Authentication:** JWT, bcrypt  
- **Deployment:** Docker, Cloudflare Workers (if used)  

## 🚀 Installation & Setup  

1. Clone the repository:  
   ```bash
   git clone https://github.com/wiishal/todo-backend-hono.git
   cd todo-backend-hono
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file and configure your database connection. Example:  
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
   JWT_SECRET="your_secret_key"
   ```

4. Run database migrations:  
   ```bash
   npx prisma migrate dev
   ```

5. Start the server:  
   ```bash
   npm run dev
   ```

## 🛠️ Contributing  

Feel free to open issues or submit PRs to improve this project!  

## 📜 License  

This project is **open-source** under the **MIT License**.
