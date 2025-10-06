-- Eliminar tablas si ya existen para empezar desde cero
DROP TABLE IF EXISTS eventos;
DROP TABLE IF EXISTS organizadores;

-- Crear tabla de Organizadores
CREATE TABLE organizadores (
    id_organizador SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20)
);

-- Crear tabla de Eventos
CREATE TABLE eventos (
    id_evento SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    afiche VARCHAR(255), -- Ruta al archivo de imagen
    id_organizador INTEGER NOT NULL,
    CONSTRAINT fk_organizador
        FOREIGN KEY(id_organizador)
        REFERENCES organizadores(id_organizador)
        ON DELETE CASCADE -- Si se borra un organizador, se borran sus eventos
);

-- Índices para mejorar rendimiento en búsquedas
CREATE INDEX idx_eventos_fecha ON eventos(fecha);
CREATE INDEX idx_eventos_organizador ON eventos(id_organizador);


-- Insertar datos de ejemplo
INSERT INTO organizadores (nombre, telefono) VALUES
('Tech Conferences Inc.', '123-456-7890'),
('Music Fest Group', '987-654-3210'),
('Art Expo Collective', '555-555-5555');

INSERT INTO eventos (titulo, fecha, afiche, id_organizador) VALUES
('Conferencia Anual de Desarrollo Web', '2025-11-15', 'afiche_conferencia_web.jpg', 1),
('Festival de Rock "Sonidos Urbanos"', '2025-10-25', 'afiche_festival_rock.png', 2),
('Exposición de Arte Moderno', '2025-12-05', NULL, 3);