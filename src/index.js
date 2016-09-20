import axios from 'axios'
import colors from 'colors'
import lodash from 'lodash'
import cli from './cli'
import { parse, resolve, join } from 'path'
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

const applyContext = {}

const es6 = (mod) => mod.default ? mod.default : mod

if (ARGV.load) {
  const script = resolve(ARGV.load)
  const name = parse(script).name

  try {
    applyContext[name] = es6(require(script))
  } catch (error) {
  }
}

export default (options = {}, context = {}, ready) => create({
  historyFile: ARGV.history || join(process.env.HOME, '.freshrepl'),
  prompt: `${'FRESH'.bold}${':'.grey}${colors.rainbow('REPL').bold}${colors.grey('> ')}`,
  ...options
}, {
  ARGV,
  lodash,
  axios,
  get: (...args) => axios.get(...args),
  post: (...args) => axios.post(...args),
  put: (...args) => axios.put(...args),
  del: (...args) => axios.del(...args),
  ...applyContext,
  ...context,
}, ready)
