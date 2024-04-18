#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('create-project')
  .description('CLI to initialize project templates')
  .version('0.1.0')
  .action(async () => {
    const templates = {
      "React 18": 'with-react-18',
      "Next 14 App router": 'with-next-14-app-router'
    };

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Choose a project template:',
        choices: Object.keys(templates)
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter a name for your project:',
        validate: input => input ? true : 'Project name cannot be empty.'
      }
    ]);

    const templatePath = path.join(__dirname, 'packages', templates[answers.template]);
    const targetPath = path.join(process.cwd(), answers.projectName);

    if (fs.existsSync(targetPath)) {
      console.error(`A project with name '${answers.projectName}' already exists in this directory.`);
      return;
    }

    fs.ensureDirSync(targetPath);
    fs.copySync(templatePath, targetPath);
    console.log(`Project initialized in ${targetPath}`);
  });

program.parse(process.argv);
