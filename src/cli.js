import pretty from 'pretty-cli'
import figlet from 'figlet'
import emoji from 'node-emoji'
import Table from 'cli-table'

export const defaultTemplate = {
  info: (message) => message,
  warning: (message) => message,
  error: (message) => `${emoji.get('boom')}\n${message}`,
  success: (message) => message,
  note: (message) => message
}

export const cli = pretty({
  template: defaultTemplate
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
  value: () => tables
})

Object.defineProperty(cli, 'figlet', {
  enumerable: false,
  value: figlet,
})

Object.defineProperty(cli, 'emoji', {
  enumerable: false,
  value: emoji,
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
