const inquirer = require('inquirer');
const figlet = require('figlet');
const db = require('./db/methods.js');
const pormpt = require('./db/prompts.js');
const prompts = require('./db/prompts.js');

figlet('DnD adveturing party creator', (err, result) => {
    console.log(err || result);
  });

  const youAllMeetInATavern = () => {

    inquirer.prompt(prompts.mainPrompt).then(function ({ choices }) {
        switch (choices) {
          case 'View MainStat': return viewMainStat();
          case 'View Classes': return viewClass();
          case 'View Adventurers': return viewAdventurer();
          case 'Add a Main Stat': return addMainStat();
          case 'Add a Class': return addClass();
          case 'Add an Adventurer': return addAdventuerer();
          case 'Update Adventurer Classes': return updateEmpClass();
          case 'Leave the Tavern': process.exit();
        }
    });
};
// View
async function viewMainStat() {
    const viewDept = await db.viewMainStat();
    console.table(viewDept);
    console.log('======================================================');
    youAllMeetInATavern();
  };

async function viewClasses() {
    const viewRole = await db.viewClasses();
    console.table(viewRole);
    console.log('======================================================');
    youAllMeetInATavern();
  };

async function viewAdventurers() {
    const viewEmps = await db.viewAdventurers();
    console.table(viewEmps);
    console.log('======================================================');
    youAllMeetInATavern();
  };
// Add
async function addDepartment() {
    const addDep = await inquirer.prompt(prompt.addDept);
    const res = await db.addDepartment(addDep.MainStat);
    console.log(`Added ${addDep.MainStat} to the the database.`);
    viewMainStat();
    console.log('======================================================');
};

async function addRole() {
    const checkDepts = await db.viewMainStat();
    const deptOptions = checkDepts.map(({ id, dept_name }) => ({
      name: mainstat_name,
      value: id
    }));
  
    const Classes = await inquirer.prompt(prompt.addingRole(deptOptions));
    await db.addRole(Classes);
    viewClasses();
    console.log('======================================================');
  };

  async function addEmployee() {
    const Classes = await db.viewClasses();
    const roleChoices = Classes.map(({ id, role_title }) => ({
      name: class_name,
      value: id
    }));
  
    const managers = await db.viewAdventurers();
    const managerIdChoices = managers.map(({ first_name, last_name, manager_id }) => ({
      name: `${first_name} ${last_name}`,
      value: manager_id
    }));
  
    const Adventurers = await inquirer.prompt(prompt.addingEmps(roleChoices, managerIdChoices))
    await db.addAdventuerer(Adventurers);
    viewAdventurers();
    console.log('======================================================');
  };

// Update
async function updateEmpClasses() {
    const checkClasses = await db.viewClasses();
    const roleChoice = checkClasses.map(({ id, role_title }) => ({
      name: class_name,
      value: id
    }));
    const checkEmps = await db.viewAdventurers();
    const empChoice = checkEmps.map(({ id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
    
    })); 
  
    const newEmpRoll = await inquirer.prompt(prompt.updateClasses(empChoice, roleChoice));
    await db.updateEmpClasses(newEmpRoll);
    viewAdventurers();
    console.log('======================================================');
  };
// start-up
  youAllMeetInATavern();