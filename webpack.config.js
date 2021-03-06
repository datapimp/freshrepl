const { join } = require('path')
const webpack = require('webpack')

module.exports = function (env) {
  const config = require('@terse/webpack').api()
    .target('node')
    .env(env)
    .entry({
      index: join(__dirname, 'src', 'index.js'),
      //app: join(__dirname, 'src', 'app/index.js'),
      //runner: join(__dirname, 'src', 'app/runner.js'),
    })
    .output('dist')
    .node({
      __dirname: false,
      __filename: false,
      process: false,
      console: false,
    })
    .loader('js', '.js', {
      loader: 'babel',
      query: {
        cacheDirectory: true,
      },
    })
    .externals(
      require('./src/webpack/helpers/externals')({
        pkg: require(process.cwd() + '/package.json'),
      })
    )
    .plugin('webpack.NamedModulesPlugin')
    //.plugin('webpack.HotModuleReplacementPlugin')
    .plugin('webpack.NoErrorsPlugin')
    .getConfig()

    /*
    .sourcemap("source-map")
    .plugin("webpack.BannerPlugin", {
      banner: `require("source-map-support").install();`,
      raw: true
    })
    */


  //config.module.unknownContextRegExp = /$^/
  //config.module.unknownContextCritical = false
  config.module.exprContextRegExp = /$^/,
  config.module.exprContextCritical = false

  delete(config.module.preLoaders)
  delete(config.output.devtoolModuleFilenameTemplate)

  return config
}
