DROP DATABASE IF EXISTS CMS_DB;

CREATE DATABASE CMS_DB;

USE CMS_DB;

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    last_name VARCHAR (20) NOT NULL,
    first_name VARCHAR (20) NOT NULL,
    role_id INT default 0,
    manager_id INT default 0,
    PRIMARY KEY (id)
);