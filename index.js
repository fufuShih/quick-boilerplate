#!/usr/bin/env node
const { Command } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

program
  .name('create-project')
  .description('CLI to initialize project templates')
  .version('0.1.0');

program.command('init')
  .description('Initialize a new project')
  .action(() => {
    const templates = {
      "React 18": 'with-React-18',
      "Next 14 App router": 'with-Next-14-App-router',
      "Next 14 Page router": 'with-Next-14-Page-router',
      "Nest": 'with-Nest'
    };

    inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Choose a project template:',
        choices: Object.keys(templates)
      }
    ]).then(answers => {
      const templatePath = path.join(__dirname, 'templates', templates[answers.template]);
      const targetPath = path.join(process.cwd(), answers.template);

      fs.copySync(templatePath, targetPath);
      console.log(`Project initialized in ${targetPath}`);
    }).catch(error => {
      console.error('Error:', error);
    });
  });

program.parse(process.argv);