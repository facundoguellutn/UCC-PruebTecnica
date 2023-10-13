import express from 'express'
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'
import profesionesRoutes from './routes/profesiones.routes.js'

const app = express()

app.use(express.json())

app.use('/api',usuariosRoutes)
app.use('/api',indexRoutes)
app.use('/api',profesionesRoutes)
app.use((req,res,next)=>{
    res.status(404).json({message:"Ruta no encontrada"})
})

export default app