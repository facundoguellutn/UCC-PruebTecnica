CREATE DATABASE IF NOT EXISTS testucc
USE testucc
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL
);
CREATE TABLE Profesion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profesion VARCHAR(50) NOT NULL,
    descripcion TEXT
);
CREATE TABLE UsuarioXProfesion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    profesion_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (profesion_id) REFERENCES Profesion(id)
);
