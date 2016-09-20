const { join } = require('path')
const { statSync } = require('fs').statSync

const exists = (path) => {
  try {
    return !!statSync(path)
  } catch(error) {
    return false
  }
}

const freshrepl = module.exports = exists('.babelrc')
  ? require('./dist')
  : require('babel-register') && require('./src')
