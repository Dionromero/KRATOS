import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { staticPlugin } from "@elysiajs/static"
import { inicializadorBanco } from "./database"
import { usuariosRoutes } from "./routes/usuarios"

await inicializadorBanco();

const app = new Elysia()
 .use(cors())
 .use(staticPlugin({assets: "public", prefix: "/"}))
 .use(usuariosRoutes)
 .get("/api/health", () => ({
    status: "online", 
    timestamp: new Date().toISOString()
 }))

.listen(process.env.PORT ?? 3000)

 console.log(`servidor rodando em http://localhost:${app.server?.port}`);