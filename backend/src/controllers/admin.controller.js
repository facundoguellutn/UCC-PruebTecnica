import { pool } from '../db.js'
import bcrypt from 'bcryptjs'
import {createAccesToken} from '../libs/jwt.js'


export const createCuenta = async (req, res) => {
    const {email, password,password2} = req.body
    try{
        const passwordHash = await bcrypt.hash(password, 10)
        const [result] = await pool.query('INSERT INTO admin (email,password) VALUES (?,?)', [email, passwordHash])
        res.send({ id: result.insertId, email, passwordHash })
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        const [result] = await pool.query('SELECT * FROM admin WHERE email = ?', [email])
        if(result.length > 0){
            const user = result[0]
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
                let token=""
                token = await createAccesToken({ id: user.id,email:user.email })
                res.cookie('token', token)
                res.send({ id: user.id, email: user.email,token:token })
            }
            else{
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        }
        else{
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

export const logout = async (req, res) => {
    res.cookie('token', "", { expires: new Date(0) })
    return res.sendStatus(200)
}