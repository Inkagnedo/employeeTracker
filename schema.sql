DROP DATABASE IF EXISTS CMS_DB;

CREATE DATABASE CMS_DB;

USE CMS_DB;

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    last_name VARCHAR (20) NOT NULL,
    first_name VARCHAR (20) NOT NULL,
    role_id INT default 0,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES ('Sagesse', 'Noudjeko', 9, 2)
       ('Celestin', 'Cory', 7, 6) 
       ('Yepes', 'Gloria', 5, 11)
       ('Turner', 'Audra', 3, 8)
       ('Sudemeyer', 'Matthew', 1, NULL)
       ('Bright', 'Thomas', 4, 3)
       ('Esteves', 'Mialany', 8, 2)
       ('Kent', 'Kyle', 2, 5)
       ('Davis', 'Ethan', 9, 2)
       ('Montanez', 'Alex', 9, 2)
       ('Hill', 'Shane', 3, 8)
       ('Lee', 'David', 10, 3)
       ('Saldutti', 'Michael', 10, 3)
       ('Fernandez', 'Jarimar', 9, 2);

SELECT * FROM employee;

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (20) NOT NULL,
    salary DECIMAL (6,2), NOT NULL,
    department_id INT default 0,
    PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 150000, 3),
       ('Assistant Manager', 90000, 3),
       ('Program Manager', 75000, 3),
       ('Site Supervisor I', 62000, 3),
       ('Site Supervisor II', 65000, 3),
       ('Site Supervisor III', 68000, 3),
       ('Recreation Specialist', 48500, 2),
       ('Recreation Leader', 44000, 2),
       ('Camp Counselor', 30000, 2),
       ('Park Specialist', 32000, 1),
       ('Sr Park Specialist', 38000, 1);

SELECT * FROM role; 

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (20) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ('Parks'), ('Recreation'), ('Development');

SELECT * FROM department;