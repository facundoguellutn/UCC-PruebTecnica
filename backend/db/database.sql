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

INSERT INTO Profesion (profesion, descripcion)
VALUES
('Ingeniero','Diseña y desarrolla software.'),
('Médico','Trata a pacientes y realiza diagnósticos médicos.'),
('Abogado','Brinda asesoramiento legal y representa a clientes en casos legales.'),
('Profesor','Imparte conocimientos y educa a estudiantes.'),
('Diseñador Gráfico','Crea diseños visuales y gráficos.'),
('Chef','Prepara platos de comida deliciosos.'),
('Enfermero','Brinda cuidados médicos y apoyo a pacientes.'),
('Ingeniero Civil','Diseña y supervisa proyectos de construcción.')

INSERT INTO Usuario (nombre, apellido, direccion)
VALUES
('Juan','Perez','Av Colon'),
('Maria','Gomez','La entente 2200'),
('Pedro','Garcia','Cruz Roja'),
('Luis','Rodriguez','Córdoba 5000'),
('Ana','Martinez','La rioja 3200'),
('Carlos','Sanchez','Av. San Martin 1000'),
('Sofia','Lopez','Maipu 1000'),
('Jorge','Gonzalez','Bv San Juan 2000')

INSERT INTO UsuarioXProfesion (usuario_id, profesion_id)
VALUES
(1,1),
(1,3),
(2,2),
(3,8),
(3,5),
(3,2),
(4,5),
(5,1),
(6,6),
(6,7),
(7,1),
(8,1),
(8,2)
