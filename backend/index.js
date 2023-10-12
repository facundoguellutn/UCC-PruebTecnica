import express from 'express'
import {pool} from'./db.js'

const app = express()

app.get('/ping', async(req, res) => {
   const result = await pool.query('SELECT 1+1 AS result')
   res.json(result)
})
app.get('/usuarios', (req, res) => {res.send('Obtener Usuarios')})
app.post('/usuarios', (req, res) => {res.send('Postear Usuarios')})
app.put('/usuarios/:id', (req, res) => {res.send('Actualizar Usuarios')})
app.delete('/usuarios/:id', (req, res) => {res.send('Borrar Usuarios')})

app.listen(3000)
console.log("Server on port 3000");
