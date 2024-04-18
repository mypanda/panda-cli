#!/usr/bin/env node

import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import shell from 'shelljs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const templateDir = resolve(__dirname, '../template/')

program
  .version('1.0.0')
  .command('create')
  .description('A CLI for genarater vue and three project')
  .action((options) => {
    const tempaltesDirs = readTemplateDirs()
    const questions = [
      {
        type: 'list',
        name: 'template',
        message: 'please select template',
        default: 0,
        choices: tempaltesDirs
      }
    ]
    inquirer.prompt(questions).then(answers => {
      const template = tempaltesDirs.find(item => answers.template === item.value)
      console.log(template)
      copyProject(template)
    })
  })

program.parse(process.argv)

function copyProject({ name }) {
  shell.cp('-R', join(__dirname, `../template/${name}`), '.')
}

function readTemplateDirs() {
  const folderList = fs.readdirSync(templateDir)
  return folderList.map(item => ({ value: item, name: item }))
}