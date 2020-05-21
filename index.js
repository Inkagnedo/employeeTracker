const mysql = require('mysql');
const inquirer = require('inquirer');
const sqlQueries = require('./lib/sqlQueries');

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "Erhs4801$",
    database: "employees_db"
});

let departmentList = [];
let roleList = [];
let employeeList = [];

connection.connect(function(err) {
    if (err) throw err;
    createDepartmentList();   
    createRoleList();  
    createEmployeesList();   
    init();             
});

function init() {
    inquirer
    .prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            "Add Department", 
            "Add Role", 
            "Add Employee",
            "Show Departments",
            "Show Roles",
            "Show Employees",
            "Update/Remove Employee Roles",
            "Exit"
        ]
    })
    .then(function(answer) {
        switch(answer.task) {
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Show Departments":
                showDepartments();
                break;
            case "Show Roles":
                showRoles();
                break;
            case "Show Employees":
                showEmployees();
                break;
            case "Update/Remove Employee Roles":
                updateRemoveEmployeeRoles();
                break;
            case "Exit":
                connection.end();           
                sqlQueries.endConnection(); 
                break;
        }
    });
}

function addDepartment() {
    inquirer
    .prompt({
        type: "confirm",
        name: "task",
        message: "Continue to add department?"
    })    
    .then(function(answer) {
        if(answer.task) {
            inquirer
            .prompt({
                type: "input",
                name: "department",
                message: "Enter department name:",
            })
            .then(function(answer) {
                if(answer.department == "") {
                    console.log("Must enter department name.");
                    addDepartment();
                } else {
                    sqlQueries.addDepartment(answer.department);
                    confirmMoreTask();
                }
            });
        } else {
            init();
        }
    });
}

function addRole() {
    createDepList();    
    inquirer
    .prompt({
        type: "confirm",
        name: "task",
        message: "Continue to add role?"
    })    
    .then(function(answer) {
        if(answer.task) {
            inquirer
            .prompt([
            {
                type: "input",
                name: "role",
                message: "Enter role:"
            },
            {
                type: "input",
                name: "salary",
                message: "Enter salary:"
            },
            {
                type: "list",
                name: "department",
                message: "What department:",
                choices: departmentList
            }
            ])
            .then(function(answer) {
                if(answer.role == "") {
                    console.log('Must enter role name.');
                    addRole();
                } else {
                    const depID = answer.department.match(/.+?(?=\,)/);
                    sqlQueries.addRole(answer.role, answer.salary, depID);
                    confirmMoreTask();
                }
            });
        } else {
            init();
        }
    });
}

function addEmployee() {
    createEmpList();   
    createRoleList();   
    inquirer
    .prompt({
        type: "confirm",
        name: "task",
        message: "Continue to add employee?"
    })
    .then(function(answer) {
        if(answer.task) {
            inquirer
            .prompt([
            {
                type: "input",
                name: "lastName",
                message: "Enter last name:"
            },         
            {
                type: "input",
                name: "firstName",
                message: "Enter first name:"
            },
            {
                type: "list",
                name: "role",
                message: "Choose employee role:",
                choices: roleList
            },
            {
                type: "list",
                name: "manager",
                message: "Choose employee's manager:",
                choices: employeeList
            }
            ])
            .then(function(answer) {
                if (answer.firstName == "" || answer.lastName == "") {
                    console.log("Last and first names need to be entered.");
                    addEmployee();
                } else {
                    const roleID = answer.role.match(/.+?(?=\,)/);
                    const managerID = answer.manager.match(/.+?(?=\,)/);
                    sqlQueries.addEmployee(answer.firstName, answer.lastName, roleID, managerID);
                    confirmMoreTask();
                }
            });
        } else {
            init();
        }
    });
}

function showDepartments() {
    sqlQueries.showDepartments();
    confirmMoreTask();
}

function showRoles() {
    sqlQueries.showRoles();
    confirmMoreTask();
}

function showEmployees() {
    sqlQueries.showEmployees();
    confirmMoreTask();
}

function updateRemoveEmployeeRoles() {
    createEmpList();    // Update the employeeList
    createRoleList();   // update the roleList
    inquirer
    .prompt({
        type: "confirm",
        name: "task",
        message: "Update/Remove employee roles?"
    })
    .then(function(answer) {
        if(answer.task) {
            inquirer
            .prompt([     
            {
                type: "list",
                name: "employee",
                message: "Choose employee to edit:",
                choices: employeeList
            },
            {
                type: "list",
                name: "role",
                message: "Choose role for the employee:",
                choices: roleList
            }
            ])
            .then(function(answer) {
                const empID = answer.employee.match(/.+?(?=\,)/);
                const roleID = answer.role.match(/.+?(?=\,)/);
                sqlQueries.updateRemoveEmployeeRoles(empID, roleID);
                confirmMoreTask();
            });
        } else {
            init();
        }
    });   
}

function confirmMoreTask() {
    inquirer
    .prompt({
        type: "confirm",
        name: "task",
        message: "Continue managing employee data?"
    })
    .then(function(answer) {
        if(answer.task) {
            init();
        } else {    
            connection.end();
            sqlQueries.endConnection();
        }
    });   
}

function createDepList() {
    departmentList = [];
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        res.forEach(department => {
            const eachDep = `${department.id}, ${department.name}`;
            departmentList.push(eachDep);
        });
    });
}
 
function createRoleList() {
    roleList = [];
    connection.query('SELECT r.id "ID", r.title "Title", r.salary "Salary", d.name "Department" FROM role r LEFT JOIN department d ON r.department_id = d.id', function(err, res) {
        if (err) throw err;
        res.forEach(role => {
            const eachRole = `${role.ID}, ${role.Title}, ${role.Salary}, ${role.Department}`;
            roleList.push(eachRole);
        });
    });
}

function createEmpList() {
    employeeList = [];
    connection.query('SELECT e.id "ID", CONCAT(e.first_name, " ", e.last_name) "Name", r.title "Role", d.name "Department" FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id;', function(err, res) {
        if (err) throw err;
        res.forEach(employee => {
            const eachEmp = `${employee.ID}, ${employee.Name}, ${employee.Role}, ${employee.Department}`;
            employeeList.push(eachEmp);
        });
        employeeList.push("None");
    });
}