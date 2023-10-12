import express from 'express'
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'
import profesionesRoutes from './routes/profesiones.routes.js'

const app = express()

app.use(express.json())

app.use(usuariosRoutes)
app.use(indexRoutes)
app.use(profesionesRoutes)

app.listen(3000)
console.log("Server on port 3000");
