DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

SELECT * FROM department;

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);

SELECT * FROM role;

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY(manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

SELECT * FROM employees;