import 'colors'

import { start } from 'repl'
import { join, resolve } from 'path'
import lodash from 'lodash'
import { existsSync as exists } from 'fs'
import promisify from './extensions/promise'
import setupHistory from './extensions/history'
import reloading from './extensions/reloading'
import {cli} from './cli'

const argv = require('minimist')(process.argv.slice(2))

const { keys, defineProperty } = Object

export function create (options = {}, context = {}, ready) {
  if (argv.es6 !== false) {
    require('babel-register')
  }

  let customize = options.customize || (exists(join(process.cwd(), '.freshrepl.js')) && '.freshrepl.js')

  if (typeof customize === 'string') {
    customize = __non_webpack_require__(resolve(process.cwd(), customize))
  }

  if (Object.keys(customize).length === 1 && typeof customize.default === 'function') {
    customize = customize.default
  }

  options = lodash.defaults(options, {
    terminal: true,
    colors: true,
    ignoreUndefined: true,
    prompt: `${'FreshREPL'.cyan}${'> '.grey}`,
    input: process.stdin,
    output: process.stdout,
    useGlobal: false,
    before: customize.before,
    after: customize.after || (typeof customize === 'function' && customize),
    ...options,
  })

  if (options.before) {
    let before = options.before

    if (typeof before === 'string') {
      before = __non_webpack_require__(resolve(process.cwd(), before))
      before = before.default ? before.default : before
    }

    if (typeof before === 'function') {
      before(cli, options, context)
    }
  }

  let server = start(options)

  Object.defineProperty(server, 'cli', {
    enumerable: false,
    get: () => cli,
  })

  server.commands['cls'] = {
    help: 'Clears the screen',
    // eslint-disable-next-line
    action: function() {
      process.stdout.write('\x1bc')
      this.displayPrompt()
    },
  }

  if (!lodash.isFunction(ready)) {
    ready = function() {}
  }

  if (options.historyFile && options.historyFile) {
    const historyFilePath = resolve(options.historyFile)
    server = setupHistory(server, historyFilePath)
  }

  if (options.lodash !== false) {
    context.lodash = context.lodash || require('lodash')
  }

  reloading(server)

  const initializeContext = () => {
    server.context.FRESHREPL = server

    keys(context).forEach(key => {
      defineProperty(server.context, key, {
        configurable: true,
        enumerable: true,
        // eslint-disable-next-line
        get: function() {
          return context[key]
        },
      })
    })

    if (typeof options.after === 'function') {
      options.after(server, options, context)
    }
  }

  server.on('reset', () => initializeContext())

  try {
    initializeContext()
    promisify(server)
  } catch (error) {
    ready(error)
    return
  }

  ready(null, server)

  return server
}

export default create
