import express from 'express'
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'
import profesionesRoutes from './routes/profesiones.routes.js'
import adminRoutes from './routes/admin.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
  }));
app.use('/api',usuariosRoutes)
app.use('/api',indexRoutes)
app.use('/api',profesionesRoutes)
app.use('/api',adminRoutes)
app.use((req,res,next)=>{
    res.status(404).json({message:"Ruta no encontrada"})
})

export default app