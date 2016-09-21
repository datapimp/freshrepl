import axios from 'axios'
import colors from 'colors'
import lodash from 'lodash'
import CLI from './cli'
import { join } from 'path'
import { create as createRepl } from './repl'

const argv = require('minimist')(process.argv)

const ARGV = {
  ...(lodash.omit(argv, '_')),
  ...lodash.mapKeys(argv , (v, k) => lodash.camelCase(k) ),
}

export const cli = CLI

export const create = (options = {}, context = {}, ready) => {
  const replServer = createRepl({
    historyFile: ARGV.history || join(process.env.HOME, '.freshrepl'),
    prompt: `${'FRESH'.bold}${':'.grey}${colors.rainbow('REPL').bold}${colors.grey('> ')}`,
    ...options,
  }, {
    ARGV,
    lodash,
    axios,
    get: (...args) => axios.get(...args),
    post: (...args) => axios.post(...args),
    put: (...args) => axios.put(...args),
    del: (...args) => axios.del(...args),
    cli: CLI,
    ...context,
  }, ready)

  return replServer
}

export default create
