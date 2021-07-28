CREATE DATABASE prueba_node;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(40) NOT NULL,
    active BOOLEAN NOT NULL
);

ALTER TABLE users 
    ADD CONSTRAINT username_unico UNIQUE (username); 