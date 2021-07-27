CREATE DATABASE prueba_node;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL,
    estado BOOLEAN NOT NULL
);