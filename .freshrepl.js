const colors = require('colors')
const sample = require('lodash/sample')

const stripes = [
  colors.red,
  colors.blue,
  colors.cyan,
  colors.magenta,
  colors.green,
  colors.yellow,
  colors.white,
]

let pos = 0

export const before = (cli, options) => {
  options.prompt = [
    cli.colors.blue(`Fre`),
    cli.colors.cyan('sh'),
    cli.colors.bold.white('REPL'),
    cli.colors.dim(':> '),
  ].join('')

  const banner = cli.figlet.textSync('FRESH', {
    font: cli.random.font,
  })
  .split("\n")
  .map(line => cli.random.color(line))
  .join("\n")

  cli.clear()
  cli.print("\n")
  cli.print(banner, 4)
  cli.print(`${cli.icon('rocket')} Launching ${'FRESH'.rainbow.bold}REPL`, 4)
  cli.print("\n\n")
  cli.print('Commands'.bold.underline, 2)
  cli.print('.reload'.bold + ': Clears the require cache and repl context', 4)
  cli.print("\n\n\n")
}

export const after = (server, options) => {
/*
  server.commands['open'] = {
    help: 'Open a file in $EDITOR',
    action: function() {
      const editor = require('editor')
      editor('beep.json', function(code, sig) {
        server.context.editorResult = {code, sig}
      })
    }
  }
  */
}
