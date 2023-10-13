import { pool } from '../db.js'

export const getUsuarios = async (req, res) => {
    try {
        const [userRows] = await pool.query('SELECT * FROM usuario');
        for (const usuario of userRows) {
            const [profesionRows] = await pool.query('SELECT p.* FROM profesion p JOIN UsuarioXProfesion up ON p.id = up.profesion_id WHERE up.usuario_id = ?', [usuario.id]);
            usuario.profesiones = profesionRows;
        }

        res.status(200).json(userRows);
    }
    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getUsuarioById = async (req, res) => {
    const { id } = req.params
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id])
        if (rows.length <= 0) return res.status(404).json({ message: 'Usuario no encontrado' })
        const usuario = rows[0];
        const [profesionRows] = await pool.query('SELECT p.* FROM profesion p JOIN UsuarioXProfesion up ON p.id = up.profesion_id WHERE up.usuario_id = ?', [id]);
        usuario.profesiones = profesionRows;
        res.json(usuario);
    }
    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

export const createUsuario = async (req, res) => {
    try {
        const { nombre, apellido, direccion, profesiones } = req.body
        const [rows] = await pool.query('INSERT INTO usuario (nombre,apellido,direccion) VALUES (?,?,?)', [nombre, apellido, direccion])
        const usuarioId = rows.insertId;
        for (const profesionId of profesiones) {
            await pool.query('INSERT INTO UsuarioXProfesion (usuario_id, profesion_id) VALUES (?, ?)', [usuarioId, profesionId]);
        }
        const [userRows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [usuarioId]);
        const [profesionRows] = await pool.query('SELECT p.* FROM profesion p JOIN UsuarioXProfesion up ON p.id = up.profesion_id WHERE up.usuario_id = ?', [usuarioId]);

        const usuario = userRows[0];
        usuario.profesiones = profesionRows;
        res.status(201).json(usuario);
    }
    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const updateUsuarioById = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, direccion, profesiones } = req.body;
    try {
        await pool.query('UPDATE usuario SET nombre = IFNULL(?,nombre), apellido = IFNULL(?,apellido), direccion = IFNULL(?,direccion) WHERE id = ?', [nombre, apellido, direccion, id]);
        await pool.query('DELETE FROM UsuarioXProfesion WHERE usuario_id = ?', [id]);
        for (const profesionId of profesiones) {
            await pool.query('INSERT INTO UsuarioXProfesion (usuario_id, profesion_id) VALUES (?, ?)', [id, profesionId]);
        }
        const [userRows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        const [profesionRows] = await pool.query('SELECT p.* FROM profesion p JOIN UsuarioXProfesion up ON p.id = up.profesion_id WHERE up.usuario_id = ?', [id]);

        const usuario = userRows[0];
        usuario.profesiones = profesionRows;

        res.status(200).json(usuario);
    }
    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const deleteUsuarioById = async (req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.query('DELETE FROM UsuarioXProfesion WHERE usuario_id = ?', [id]);
        await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.sendStatus(204);
    }
    catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}