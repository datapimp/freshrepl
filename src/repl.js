import 'colors'

import { start } from 'repl'
import { resolve } from 'path'
import lodash from 'lodash'
import promisify from './extensions/promise'
import setupHistory from './extensions/history'

const { keys, defineProperty } = Object

export function create (options = {}, context = {}, ready) {
  options = lodash.defaults(options, {
    terminal: true,
    colors: true,
    ignoreUndefined: true,
    prompt: `${'FreshREPL'.cyan}${'> '.grey}`,
    input: process.stdin,
    output: process.stdout,
    useGlobal: true,
    ...options
  })

  let server = start(options)

  if (!lodash.isFunction(ready)) {
    ready = function() {}
  }

  if (options.historyFile && options.historyFile) {
    let historyFilePath = resolve(options.historyFile)
    server = setupHistory(server, historyFilePath)
  }

  keys(context).forEach(key => {
    defineProperty(server.context, key, {
      configurable: true,
      enumerable: true,
      get: function() {
        return context[key]
      }
    })
  })

  try {
    promisify(server)
  } catch (error) {
    ready(error)
    return
  }

  ready(null, server)

  return server
}

export default create
