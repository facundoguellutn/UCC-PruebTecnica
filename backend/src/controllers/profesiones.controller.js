import { pool } from '../db.js'

export const getProfesiones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM profesion')
        res.json(rows)
    }

    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getProfesionById = async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await pool.query('SELECT * FROM profesion WHERE id = ?', [id])
        if (rows.length <= 0) return res.status(404).json({ message: 'Profesion no encontrada' })
        res.json(rows[0])
    }

    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const createProfesion = async (req, res) => {
    try {
        const { profesion, descripcion } = req.body
        const [rows] = await pool.query('INSERT INTO profesion (profesion,descripcion) VALUES (?,?)', [profesion, descripcion])
        res.send({ id: rows.insertId, profesion, descripcion })
    }

    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const updateProfesionById = async (req, res) => {
    try {
        const { id } = req.params
        const { profesion, descripcion } = req.body
        const [result] = await pool.query('UPDATE profesion SET profesion = IFNULL(?,profesion), descripcion = IFNULL(?,descripcion) WHERE id = ?', [profesion, descripcion, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Profesion no encontrada' })
        const [rows] = await pool.query('SELECT * FROM profesion WHERE id = ?', [id])
        return res.json(rows[0])
    }
    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const deleteProfesionById = async (req, res) => {
    const { id } = req.params
    try {
        await pool.query('DELETE FROM usuarioxprofesion WHERE profesion_id = ?', [id]);
        const [result] = await pool.query('DELETE FROM profesion WHERE id = ?', [id]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Profesion no encontrada' })
        res.sendStatus(204)
    }
    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

