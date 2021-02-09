const mysql = require('mysql');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');

let main_stat;
let archtype;
let leaders;
let adventurer;

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Password",
    database: "dungeonparty_db"
  });

  figlet('FSC adventurer Tracker', (err, result) => {
    console.log(err || result);
  });

  connection.connect(function(err) {
    if (err) throw err;
    start();
    getarchtype();
    getmain_stat();
    getleaders();
    getadventurer();
  });
  start = () => {

    inquirer
      .prompt({
        name: "choices",
        type: "list",
        message: "What would you like to do adventurer?",
        choices: ["ADD", "VIEW", "UPDATE", "DELETE", "EXIT"]
      })
      .then(function(answer) {
        if (answer.choices === "ADD") {
          addSomething();
        }
        else if (answer.choices === "VIEW") {
          viewSomething();
        } 
        else if (answer.choices === "UPDATE") {
          updateSomething();
        }
        else if (answer.choices === "DELETE") {
          deleteSomething();
        }
        else if (answer.choices === "EXIT") {
          figlet('Thanks for using the Dungeon Party Tracker', (err, result) => {
            console.log(err || result);
          });
        
          connection.end();
        }
        else{
          connection.end();
        }
      });
  }

getmain_stat = () => {
  connection.query("SELECT id, title FROM main_stat", (err, res) => {
    if (err) throw err;
    main_stat = res;
    console.table(main_stat);
  })
};

getarchtype = () => {
    connection.query("SELECT id, name FROM archtype", (err, res) => {
      if (err) throw err;
      archtype = res;
      // console.log(archtype);
    })
  };
  
getleaders = () => {
    connection.query("SELECT id, first_name, last_name, CONCAT_WS(' ', first_name, last_name) AS leaders FROM adventurer", (err, res) => {
      if (err) throw err;
      leaders = res;
      // console.table(leaders);
    })
  };
  
getadventurer = () => {
    connection.query("SELECT id, CONCAT_WS(' ', first_name, last_name) AS adventurer_Name FROM adventurer", (err, res) => {
      if (err) throw err;
      adventurer = res;
      // console.table(adventurer);
    })
  };
  
  addSomething = () => {
    inquirer.prompt([
      {
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: ["archtype", "main_stat", "adventurer", "EXIT"]
      }
    ]).then(function(answer) {
      if (answer.add === "archtype") {
        console.log("Add a new: " + answer.add);
        addarchtype();
      }
      else if (answer.add === "main_stat") {
        console.log("Add a new: " + answer.add);
        addmain_stat();
      }
      else if (answer.add === "adventurer") {
        console.log("Add a new: " + answer.add);
        addadventurer();
      } 
      else if (answer.add === "EXIT") {
        figlet('Thanks for using FSC adventurer Tracker', (err, result) => {
          console.log(err || result);
        });
  
        connection.end();
      } else {
        connection.end();
      }
    })
  };

  addarchtype = () => {
    inquirer.prompt([
      {
        name: "archtype",
        type: "input",
        message: "What archtype would you like to add?"
      }
    ]).then(function(answer) {
      connection.query(`INSERT INTO archtype (name) VALUES ('${answer.archtype}')`, (err, res) => {
        if (err) throw err;
        console.log("1 new archtype added: " + answer.archtype);
        getarchtype();
        start();
      }) 
    })
  };

  addmain_stat = () => {
    let archtypeOptions = [];
    for (i = 0; i < archtype.length; i++) {
      archtypeOptions.push(Object(archtype[i]));
    };
  
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What main_stat would you like to add?"
      },
      {
        name: "gold",
        type: "input",
        message: "What is the gold for this possition?"
      },
      {
        name: "archtype_id",
        type: "list",
        message: "What is the archtype for this possition?",
        choices: archtypeOptions
      },
    ]).then(function(answer) {
      for (i = 0; i < archtypeOptions.length; i++) {
        if (archtypeOptions[i].name === answer.archtype_id) {
          archtype_id = archtypeOptions[i].id
        }
      }
      connection.query(`INSERT INTO main_stat (title, gold, archtype_id) VALUES ('${answer.title}', '${answer.gold}', ${archtype_id})`, (err, res) => {
        if (err) throw err;
  
        console.log("1 new main_stat added: " + answer.title);
        getmain_stat();
        start();
      }) 
    })
  };
  
  addadventurer = () => {
    getmain_stat();
    getleaders();
    let main_statOptions = [];
    for (i = 0; i < main_stat.length; i++) {
      main_statOptions.push(Object(main_stat[i]));
    };
    let managerOptions = [];
    for (i = 0; i < leaders.length; i++) {
      managerOptions.push(Object(leaders[i]));
    }
    inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the adventurer's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the adventurer's last name?"
      },
      {
        name: "main_stat_id",
        type: "list",
        message: "What is the main_stat for this adventurer?",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < main_statOptions.length; i++) {
            choiceArray.push(main_statOptions[i].title)
          }
          return choiceArray;
        }
      },
      {
        name: "manager_id",
        type: "list",
        message: "Who is the adventurer's manager?",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < managerOptions.length; i++) {
            choiceArray.push(managerOptions[i].leaders)
          }
          return choiceArray;
        }
      }
    ]).then(function(answer) {
      for (i = 0; i < main_statOptions.length; i++) {
        if (main_statOptions[i].title === answer.main_stat_id) {
          main_stat_id = main_statOptions[i].id
        }
      }
  
      for (i = 0; i < managerOptions.length; i++) {
        if (managerOptions[i].leaders === answer.manager_id) {
          manager_id = managerOptions[i].id
        }
      }
  
      connection.query(`INSERT INTO adventurer (first_name, last_name, main_stat_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', ${main_stat_id}, ${manager_id})`, (err, res) => {
        if (err) throw err;
  
        console.log("1 new adventurer added: " + answer.first_name + " " + answer.last_name);
        getadventurer();
        start()
      }) 
    })
  };
  
viewadventurer = () => {
    connection.query('SELECT e.id, e.first_name, e.last_name, d.name AS archtype, r.title, r.gold, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM adventurer e LEFT JOIN adventurer m ON m.id = e.manager_id INNER JOIN main_stat r ON e.main_stat_id = r.id INNER JOIN archtype d ON r.archtype_id = d.id ORDER BY e.id ASC', (err, res) => {
      if (err) throw err;
      figlet('adventurer', (err, result) => {
        console.log(err || result);
      });
    
      printTable(res);
      start();
    });
  };

  updateSomething = () => {
    inquirer.prompt([
      {
        name: "update",
        type: "list",
        message: "Choose something to update:",
        choices: ["Update adventurer main_stat", "Update adventurer leaders", "EXIT"]
      }
    ]).then(answer => {
      if (answer.update === "Update adventurer main_stat") {
        updateadventurermain_stat();
      }
      else if (answer.update === "Update adventurer leaders") {
        updateadventurerManager();
      }
      else if(answer.update === "EXIT") {
        figlet('Thanks for using FSC adventurer Tracker', (err, result) => {
          console.log(err || result);
        });
  
        connection.end();
      } else {
        connection.end();
      }
    })
  };
  
  updateadventurermain_stat = () => {
    let adventurerOptions = [];
  
    for (var i = 0; i < adventurer.length; i++) {
      adventurerOptions.push(Object(adventurer[i]));
    }
    inquirer.prompt([
      {
        name: "updatemain_stat",
        type: "list",
        message: "Which adventurer's main_stat do you want to update?",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < adventurerOptions.length; i++) {
            choiceArray.push(adventurerOptions[i].adventurer_Name);
          }
          return choiceArray;
        }
      }
    ]).then(answer => {
      let main_statOptions = [];
      for (i = 0; i < main_stat.length; i++) {
        main_statOptions.push(Object(main_stat[i]));
      };
      for (i = 0; i < adventurerOptions.length; i++) {
        if (adventurerOptions[i].adventurer_Name === answer.updatemain_stat) {
          adventurerelected = adventurerOptions[i].id
        }
      }
      inquirer.prompt([
        {
          name: "newmain_stat",
          type: "list",
          message: "Select a new main_stat:",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < main_statOptions.length; i++) {
              choiceArray.push(main_statOptions[i].title)
            }
            return choiceArray;
          }
        }
      ]).then(answer => {
  for (i = 0; i < main_statOptions.length; i++) {
    if (answer.newmain_stat === main_statOptions[i].title) {
      newChoice = main_statOptions[i].id
      connection.query(`UPDATE adventurer SET main_stat_id = ${newChoice} WHERE id = ${adventurerelected}`), (err, res) => {
        if (err) throw err;
      };
    }
  }
  console.log("main_stat updated succesfully");
  getadventurer();
  getmain_stat();
  start();
      })
    })
  };

  updateadventurerManager = () => {
    let adventurerOptions = [];
  
    for (var i = 0; i < adventurer.length; i++) {
      adventurerOptions.push(Object(adventurer[i]));
    }
    inquirer.prompt([
      {
        name: "updateManager",
        type: "list",
        message: "Which adventurer's manager do you want to update?",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < adventurerOptions.length; i++) {
            choiceArray.push(adventurerOptions[i].adventurer_Name);
          }
          return choiceArray;
        }
      }
    ]).then(answer => {
      getadventurer();
      getleaders();
      let managerOptions = [];
      for (i = 0; i < leaders.length; i++) {
        managerOptions.push(Object(leaders[i]));
      };
      for (i = 0; i < adventurerOptions.length; i++) {
        if (adventurerOptions[i].adventurer_Name === answer.updateManager) {
          adventurerelected = adventurerOptions[i].id
        }
      }
      inquirer.prompt([
        {
          name: "newManager",
          type: "list",
          message: "Select a new manager:",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < managerOptions.length; i++) {
              choiceArray.push(managerOptions[i].leaders)
            }
            return choiceArray;
          }
        }
      ]).then(answer => {
  for (i = 0; i < managerOptions.length; i++) {
    if (answer.newManager === managerOptions[i].leaders) {
      newChoice = managerOptions[i].id
      connection.query(`UPDATE adventurer SET manager_id = ${newChoice} WHERE id = ${adventurerelected}`), (err, res) => {
        if (err) throw err;
      };
      console.log("Manager Updated Succesfully");
    }
  }
  getadventurer();
  getleaders();
  start();
      })
    })
  };
  
  deleteSomething = () => {
    inquirer.prompt([
      {
        name: "delete",
        type: "list",
        message: "Select something to delete:",
        choices: ["Delete archtype", "Delete main_stat", "Delete adventurer", "EXIT"]
      }
    ]).then(answer => {
      if (answer.delete === "Delete archtype") {
        deletearchtype();
      }
      else if (answer.delete === "Delete main_stat") {
        deletemain_stat();
      }
      else if (answer.delete === "Delete adventurer") {
        deleteadventurer();
      } else if(answer.delete === "EXIT") {
        figlet('Thanks for using FSC adventurer Tracker', (err, result) => {
          console.log(err || result);
        });
  
        connection.end();
      }
       else {
        connection.end();
      }
    })
  };
  
  deletearchtype = () => {
    let archtypeOptions = [];
    for (var i = 0; i < archtype.length; i++) {
      archtypeOptions.push(Object(archtype[i]));
    }
  
    inquirer.prompt([
      {
        name: "deletearchtype",
        type: "list",
        message: "Select a archtype to delete",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < archtypeOptions.length; i++) {
            choiceArray.push(archtypeOptions[i])
          }
          return choiceArray;
        }
      }
    ]).then(answer => {
      for (i = 0; i < archtypeOptions.length; i++) {
        if (answer.deletearchtype === archtypeOptions[i].name) {
          newChoice = archtypeOptions[i].id
          connection.query(`DELETE FROM archtype Where id = ${newChoice}`), (err, res) => {
            if (err) throw err;
          };
          console.log("archtype: " + answer.deletearchtype + " Deleted Succesfully");
        }
      }
      getarchtype();
      start();
    })
  };
  
  deletemain_stat = () => {
    let main_statOptions = [];
    for (var i = 0; i < main_stat.length; i++) {
      main_statOptions.push(Object(main_stat[i]));
    }
  
    inquirer.prompt([
      {
        name: "deletemain_stat",
        type: "list",
        message: "Select a main_stat to delete",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < main_statOptions.length; i++) {
            choiceArray.push(main_statOptions[i].title)
          }
          return choiceArray;
        }
      }
    ]).then(answer => {
      for (i = 0; i < main_statOptions.length; i++) {
        if (answer.deletemain_stat === main_statOptions[i].title) {
          newChoice = main_statOptions[i].id
          connection.query(`DELETE FROM main_stat Where id = ${newChoice}`), (err, res) => {
            if (err) throw err;
          };
          console.log("main_stat: " + answer.deletemain_stat + " Deleted Succesfully");
        }
      }
      getmain_stat();
      start();
    })
  };
  
  deleteadventurer = () => {
    let adventurerOptions = [];
    for (var i = 0; i < adventurer.length; i++) {
      adventurerOptions.push(Object(adventurer[i]));
    }
  
    inquirer.prompt([
      {
        name: "deleteadventurer",
        type: "list",
        message: "Select a adventurer to delete",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < adventurerOptions.length; i++) {
            choiceArray.push(adventurerOptions[i].adventurer_Name)
          }
          return choiceArray;
        }
      }
    ]).then(answer => {
      for (i = 0; i < adventurerOptions.length; i++) {
        if (answer.deleteadventurer === adventurerOptions[i].adventurer_Name) {
          newChoice = adventurerOptions[i].id
          connection.query(`DELETE FROM adventurer Where id = ${newChoice}`), (err, res) => {
            if (err) throw err;
          };
          console.log("adventurer: " + answer.deleteadventurer + " Deleted Succesfully");
        }
      }
      getadventurer();
      start();
    })
  };