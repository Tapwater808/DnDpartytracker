module.exports = {
    mainPrompt: {
        type: 'list',
        name: 'choices',
        message: 'Welcome to the adventuring party tracker! What would you like to do?',
        choices: [
                'View main stats',
                'View roles',
                'View adventurer',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee roles',
                'EXIT',
        ],
    },

    addDept: {
        name: "main stats",
        type: "input",
        message: "What is the name of the new main statistic you wish to add?"
    },

    addingClass: (mainStatOptions) => [
        {
            type: 'input',
            name: 'role_title',
            message: 'What is the name of the new role you wish to add?'
          },
          {
            type: 'input',
            name: 'salary',
            message: 'What is the gold salary for this new role?'
          },
          {
            type: 'list',
            name: 'mainStat_id',
            message: 'Into which main stat would this class use?',
            choices: mainStatOptions
          },
    ],

    addingEmps: (classChoices, managerIdChoices) => [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the new adventurer\'s first name?'
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'What is the new adventurer\'s last name?'
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'What is the class of this adventurer?',
            choices: classChoices
          },
          {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager for this adventurer?',
            choices: managerIdChoices
          },
    ],

    updateRoles: (adventurerChoice, classChoice) => [
        {
            type: 'list',
            name: 'empId',
            message: 'Whose class would you like to update?',
            choices: adventurerChoice
          },
      
          {
            type: 'list',
            name: 'newClass',
            message: 'What is the adventurer\'s new class?',
            choices: classChoice
          },
    ],
};