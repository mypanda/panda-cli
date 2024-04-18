const { Command } = require("commander")
const figlet = require("figlet")

console.log(figlet.textSync("Panda Genarater"))

const program = new Command()
program
  .version('1.0.0')
  .description('A CLI for genarater project file.')
  .option("-l, --ls  [value]", "List tempalte")
  .parse(process.argv)

const options = program.opts()