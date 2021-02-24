const inquirer = require('inquirer');
const figlet = require('figlet');

figlet('DnD adveturing party creator', (err, result) => {
    console.log(err || result);
  });