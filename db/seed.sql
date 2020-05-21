USE employees_db;

INSERT INTO department (name) 
VALUES  ("Parks"), ("Recreation"), ("Development")
;

INSERT INTO role (title, salary, department_id) 
VALUES  ("Manager", 200000, 3),
        ("Assistant Manager", 125000, 3),
        ("Program Manager", 80000, 3),
        ("Site Supervisor", 60000, 2),
        ("Rec Center Supervisor", 52000, 2),
        ("Recreation Specialist", 45000, 2),
        ("Recreation Leader", 38000, 2),
        ("Sr Park Specialist", 42000, 1),
        ("Park Specialist", 32000, 1),
        ("Student Intern", 13000, 1)
;

INSERT INTO employees (last_name, first_name, role_id, manager_id) 
VALUES  ("Sudemeyer", "Matt", 1, NULL),
        ("Kent", "Kyle", 2, 1),
        ("Hill", "Shane", 3, 2),
        ("Turner", "Audra", 3, 2),
        ("Rodriguez", "Betzy", 4, 4),
        ("Yepes", "Gloria", 4, 3),
        ("Bright", "Thomas", 5, 6),
        ("Melo", "Paola", 6, 7),
        ("Celestin", "Cory", 7, 7),
        ("Esteves", "Mialany", 7, 7),
        ("Lee", "David", 8, 7),
        ("Torres", "Daniel", 9, 11),
        ("Davis", "Ethan", 10, 7)
;