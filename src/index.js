import colors from 'colors'
import CLI from './cli'
import omit from 'lodash/omit'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import { join } from 'path'
import { create as createRepl } from './repl'

const argv = require('minimist')(process.argv)

const ARGV = {
  ...(omit(argv, '_')),
  ...mapKeys(argv , (v, k) => camelCase(k) ),
}

export const cli = CLI

export const create = (options = {}, context = {}, ready) => {
  const replServer = createRepl({
    historyFile: ARGV.history || join(process.env.HOME, '.freshrepl'),
    prompt: `${'FRESH'.bold}${':'.grey}${colors.rainbow('REPL').bold}${colors.grey('>')} `,
    ...options,
  }, {
    ARGV,
    ...context,
  }, ready)

  return replServer
}

export default create
