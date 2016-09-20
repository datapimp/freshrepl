const loaders = require('./helpers/loaders')
const passThroughNodeModules = require('./helpers/node-module-externals')
const { EXPOSE_ENV } = require('./env')
const wantsHMR = process.env.ENABLE_HMR || process.argv.indexOf('--hot')

export default (options = {paths: {}}) => (
  require('@terse/webpack').api()
    .target('node')

    .output({
      path: paths.output,
      filename: '[name].js'
    })

    // Also don't bundle any of our sibling projects
    .externals(paths.contexPaths)
    
    // File Loaders
    .loader('json', '.json')

    .loader('yml', ['.yml','.yaml'], {
      loader: 'json!yaml'
    })

    .loader('images', ['.jpg','.png','.gif'], {
      include: [paths.assets],
      loader: loaders.assets.imageLoader('production', {
        progressive:true,
        optimizationLevel: 7,
        interlaced: false,
        pngquant:{
          quality: "65-90",
          speed: 4
        }
      })
    })


    .loader('file', ['.eot', '.svg', '.ttf', '.woff', '.woff2'], {
      loader: 'url-loader?name=[path][name].[ext]&limit=8192',
      include: [
        project.paths.frontend.join('src/assets')
      ],
      exclude: [/node_modules/]
    })

    // Tells webpack to leave these alone
    .node({
      __dirname: false,
      __filename: false,
      process: false,
      console: false
    })

    .plugin('webpack.NamedModulesPlugin')

    // Make react available to everything
    .plugin('webpack.ProvidePlugin', {
      React: 'react',
      Promise: 'bluebird'
    })

     // Source Map Support in node requires the source-map-support module
    .sourcemap("source-map")

    .plugin("webpack.BannerPlugin", {
      banner: `require("source-map-support").install();`,
      raw: true
    })

    // ignore auto-lazy loaded moment-locales
    .plugin('webpack.IgnorePlugin', /^\.\/locale$/, /moment$/)

    .loader('css', ['.css'], {
      loader: 'null'
    })

    .when('production', (builder) => (builder
      .loader('babel', '.js', loaders.scripts.babelLoader({
        exclude: [
          /node_modules/,
          ...paths.outputPaths
        ],
        include: [
          ...paths.sourcePaths
        ]
      }))
    ))

    // In development we use a few different babel-presets and babel-loader options
    .when('development', (builder) => (builder
      .loader('babel', '.js', loaders.scripts.babelHotLoader({
        hot: wantsHMR,
        exclude: [
          /node_modules/,
          ...paths.outputPaths
        ],
        include: [
          ...paths.sourcePaths
        ]
      }))
    ))
)
