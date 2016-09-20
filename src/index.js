import colors from 'colors'
import lodash from 'lodash'
import cli from './cli'
import { join } from 'path'
import { create } from './repl'

const ARGV = lodash.mapKeys(require('minimist')(process.argv), (v, k) => lodash.camelCase(k))

cli.print()
cli.print(
  colors.rainbow(cli.figlet.textSync('Fresh', {
    font: 'graffiti'
  }))
)

cli.print('\n')
cli.print(`ES6 ${'enabled'.bold} Promises ${'enabled'.bold}`)
cli.print('\n\n')

const repl = (options = {}, context = {}, ready) => create({
  historyFile: ARGV.history || join(process.env.HOME, '.freshrepl'),
  prompt: `${'FRESH'.bold}${':'.grey}${colors.rainbow('REPL').bold}${colors.grey('> ')}`,
  ...options
}, {
  ARGV,
  lodash,
  ...context
}, ready)

export default repl

repl({}, {
  axios: require('axios'), lodash: require('lodash')
})
