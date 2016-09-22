import pretty from 'pretty-cli'
import figlet from 'figlet'
import emoji from 'node-emoji'
import Table from 'cli-table'
import sample from 'lodash/sample'
import colors from 'colors'

export const defaultTemplate = {
  info: (message) => message,
  warning: (message) => message,
  error: (message) => `${emoji.get('boom')}\n${message}`,
  success: (message) => message,
  note: (message) => message,
}

export const cli = pretty({
  template: defaultTemplate,
})

cli.cmd = (...args) => cli.addCustomMethod(...args)

export default cli

cli.addCustomMethod('print', (messages = [], indentationLevel = 0) => {
  if (typeof messages === 'string') {
    messages = messages.split('\n')
  }

  messages.forEach(message => {
    console.log(indentationLevel > 0 ? `${Array(indentationLevel).join(' ')}${message}` : message)
  })
})

const tables = {}

Object.defineProperty(cli, 'tables', {
  enumerable: false,
  value: () => tables,
})

Object.defineProperty(cli, 'figlet', {
  enumerable: false,
  value: figlet,
})

Object.defineProperty(cli, 'emoji', {
  enumerable: false,
  value: emoji,
})

Object.defineProperty(cli, 'icon', {
  enumerable: false,
  value: (...args) => emoji.get(...args),
})

Object.defineProperty(cli, 'spinner', {
  enumerable: false,
  value: require('cli-spinner').Spinner,
})

Object.defineProperty(cli, 'colors', {
  enumerable: false,
  value: colors,
})

Object.defineProperty(cli, 'random', {
  enumerable: false,
  value: {
    get color() {
      return sample([
        colors.red, colors.cyan, colors.magenta, colors.green, colors.blue, colors.white, colors.grey, colors.yellow,
      ])
    },
    get font() {
      return sample(require('figlet').fontsSync())
    },
  },
})

cli.addCustomMethod('randomBanner', (value, indent = 2, debug = false) => {
  const font = cli.random.font

  if (debug) {
    console.log('Using font', font)
  }
  
  const banner = figlet.textSync(value, {
    font: cli.random.font,
  })
  .split("\n")
  .map(line => cli.random.color(line))
  .join("\n")

  cli.print(banner, indent)
})

cli.addCustomMethod('banner', (value, indent = 2) => {
  cli.print(
    figlet.textSync(value || 'FreshREPL', {
      font: 'Slant',
    }), indent
  )
})

cli.addCustomMethod('table', (tableName, data) => {
  console.log(tables[tableName].push(data).toString())
})

cli.addCustomMethod('defineTable', (tableName, params = {}) => {
  tables[tableName] = new Table(params)
})

cli.addCustomMethod('clear', () => (
  process.stdout.write('\x1bc')
))
