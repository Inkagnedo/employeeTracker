const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require("console.table");
const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "Erhs4801$",
    database: "employees_db"
});

let department = [];
let role = [];
let employees = [];

module.exports = {
    starting: function () {
        start()
    }
}

function update() {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;

        inquirer
        .prompt([            
            {
            name: "empId",
            type: "rawlist",
            choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < s.length; i++) {
                        choiceArray.push(managers[i].id + " " + managers[i].first_name + " " + managers[i].last_name);
                    }
                    return choiceArray;
                },
                message: "Who role do you want to update??"
            },
            {
                name: "roleId",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < roles.length; i++) {
                        choiceArray.push(roles[i].id + " " + roles[i].title);
                    }
                    return choiceArray;
                },
                message: "What is their role?",
            }
        ])
        .then(function (answer) {
           const empID = answer.empId.split(" ")
           const rolId = answer.roleId.split(" ")
              connection.query(
            "UPDATE employees SET ? WHERE ?",
            [
                {
                    role_id: rolId[0]
                },
                {  
                    id: empID[0]
                }
            ],
              function(error) {
                if (error) throw err;
                console.log("update");
                start();
            })
        });
    })
}

function view() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What do you want to VIEW?",
            choices: ["Departments", "Roles", "Employees", "Go Back"]
        })
        .then(function (answer) {
            if (answer.choice === "Departments") {
                connections("department");
                start();
            }
            else if (answer.choice === "Roles") {
                connections("role");
            }
            else if (answer.choice === "Employees") {
                connections("employees");
            }
            else {
                connection.end();
            }
        });
}

function add() {
    inquirer
    .prompt({
        name: "choice",
        type: "list",
        message: "What would you like to ADD?",
        choices: ["Employee", "Department", "Role", "Exit"]
    })
    .then(function (answer) {
        if (answer.choice === "Employee") {
            addEmployee();
        }
        else if (answer.choice === "Department") {
            addDepartment();
        }
        else if (answer.choice === "Role") {
            addRole();
        }
        else {
            connection.end();
        }
    })
}

function addRole(){
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Name role?",
        },
        {
            name: "salary",
            type: "input",
            message: "Salary?",
        },
        {
            name: "id",
            type: "input",
            message: "What is the ID?",
        },
    ]).then(function(answer){
       ;
        connection.query(
            " INSERT INTO role (title, salary, department_id) values (?, ?, ?)", 
            [
                answer.title, 
                answer.salary,
                answer.id
            ]
                ,
            function (err) {
                if (err) throw err;
                console.log("Your auction was created successfully!");
                start();
            }
        );
    })
}
function addDepartment(){
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of the department?",
        },
    ]).then(function(answer){
       ;
        connection.query(
            " INSERT INTO department (name) values (?)",answer.departments
            ,
            function (err) {
                if (err) throw err;
                console.log("Your auction was created successfully!");
                start();
            }
        );
    })
}

function connections(types) {
    const sql = 'SELECT * FROM ' + types;
    connection.query(
        sql,
        function (err, res) {
            if (err) throw err;
            console.table(res);  
            start()
        }
    );
}

function start() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        roles = results
    })
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        managers = results
    })
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        departments = results
    })
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "Employee Tracker",
            choices: ["View", "Add", "Update", "Exit"]
        })
        .then(function (answer) {
            if (answer.choice === "Add") {
                add();
            }
            else if (answer.choice === "View") {
                view();
            }
            else if (answer.choice === "Update") {
                update();
            }
            else {
                connection.end();
            }
        });
}

function addEmployee() {
    inquirer
    .prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is their first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "What is their last name?",
        },
        {

            name: "roleId",
            type: "rawlist",
            choices: function () {
                var choiceArray = [];
                for (var i = 0; i < roles.length; i++) {
                    choiceArray.push(roles[i].id + " " + roles[i].title);
                }
                return choiceArray;
            },
            message: "What is their role?",
        },
        {
            name: "managerId",
            type: "rawlist",
            choices: function () {
                var choiceArray = [];
                console.log(managers.length)
                for (var i = 0; i < managers.length; i++) {
                    choiceArray.push(managers[i].id + " " + managers[i].first_name+ " " + managers[i].last_name);
                }
                return choiceArray;
            },
            message: "Who is their manager?",
        },
    ])
    .then(function (answer) {
        role = answer.roleId.split(" ");
        man = answer.managerId.split(" ");
        connection.query(
            "INSERT INTO employees SET ?",
            {
                last_name: answer.lastName,
                first_name: answer.firstName,
                role_id: role[0],
                manager_id: man[0]
            },
            function (err) {
                if (err) throw err;
                console.log("Your auction was created successfully!");
                start();
            }
        );
    });
   

}