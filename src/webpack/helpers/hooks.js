function defineAllHooks() {
  defineCompilerHook(
    'compilerIsRunning',
    'run',
    true,
    'compiler',
    'callback'
  )

  defineCompilerHook(
    'compilerIsWatching',
    'watch-run',
    true,
    'watching',
    'callback'
  )

  defineCompilerHook(
    'compilationIsReady',
    'compilation',
    false,
    'compilation'
  )

  defineCompilerHook(
    'didEnterCompilePhase',
    'compile',
    false
  )

  defineCompilerHook(
    'handleMake',
    'make',
    false,
    'compilation'
  )

  defineCompilerHook(
    'didFinishCompilePhase',
    'after-compile',
    true,
    'compilation'
  )

  defineCompilerHook(
    'willEmit',
    'emit',
    true,
    'compilation',
    'callback'
  )

  defineCompilerHook(
    'didEmit',
    'after-emit',
    true,
    'compilation',
    'callback'
  )

  defineCompilerHook(
    'compilerIsDone',
    'done',
    false,
    'stats'
  )

  defineCompilerHook(
    'compilerProducedStats',
    'done',
    false,
    'stats'
  )

  defineCompilerHook(
    'compilerDidFail',
    'failed',
    false,
    'err'
  )

  defineCompilerHook(
    'compilerDetectedChange',
    'invalid',
    false
  )

  defineCompilationHook(
    'willLoadModules',
    'normal-module-loader',
    false,
    'loaderContext',
    'module'
  )

  defineCompilationHook(
    'willSeal',
    'seal',
    false
  )

  defineCompilationHook(
    'willOptimize',
    'optimize',
    false
  )

  defineCompilationHook(
    'willOptimizeTree',
    'optimize-tree',
    true,
    'chunks',
    'modules',
    'callback'
  )

  defineCompilationHook(
    'willOptimizeChunks',
    'optimize-chunks',
    false,
    'chunks'
  )

  defineCompilationHook(
    'didOptimizeChunks',
    'after-optimize-chunks',
    false,
    'chunks'
  )

  defineCompilationHook(
    'willOptimizeModules',
    'optimize-modules',
    false,
    'modules'
  )

  defineCompilationHook(
    'didOptimizeModules',
    'after-optimize-modules',
    false,
    'modules'
  )

  defineCompilationHook(
    'didOptimizeModuleIds',
    'after-optimize-module-ids',
    false,
    'modules'
  )

  defineCompilationHook(
    'willOptimizeChunkAssets',
    'optimize-chunk-assets',
    true,
    'chunks',
    'callback'
  )

  defineCompilationHook(
    'didOptimizeChunkAssets',
    'after-optimize-chunk-assets',
    false,
    'chunks'
  )

  defineCompilationHook(
    'willOptimizeAssets',
    'optimize-assets',
    true,
    'assets',
    'callback'
  )

  defineCompilationHook(
    'didOptimizeAssets',
    'after-optimize-assets',
    false,
    'assets'
  )

  defineCompilationHook(
    'willBuildModule',
    'build-module',
    false,
    'module'
  )

  defineCompilationHook(
    'moduleWasSuccessful',
    'succeed-module',
    false,
    'module'
  )

  defineCompilationHook(
    'moduleWasFailure',
    'failed-module',
    false,
    'module'
  )

  defineCompilationHook(
    'didAddModuleAssets',
    'module-asset',
    false,
    'module',
    'filename'
  )

  defineCompilationHook(
    'didAddChunkAsset',
    'chunk-asset',
    false,
    'chunk',
    'filename'
  )

  defineCompilationHook(
    'beforeHash',
    'before-hash',
    false,
  )

  defineCompilationHook(
    'afterHash',
    'after-hash',
    false,
  )

  defineCompilationHook(
    'willRecord',
    'record',
    false,
    'compilation',
    'records'
  )
}

/**
 * The Skypager Webpack Plugin bridges the Webpack compiler and compilation events,
 * and asset metadata with the Skypager Project, which uses it to create the database
 * and export content to other forms.

 * @param  {Object} cfg =             {} Plugin Configuration
 * @param  {Project} cfg.project the Skypager project that is supplying the bundle
 */
export function WebpackPlugin(cfg = {}) {
  defineAllHooks()

  return {
    apply: apply.bind(this, cfg)
  }
}

export const HookDefinitions = {
  compiler: { },
  compilation: { },
  normalModuleFactories: { },
  contextModuleFactories: { },
  mainTemplate: { },
  normalResolvers: { },
  parser: { },
}

export function defineHook(type, eventName, webpackId, async, ...paramNames) {
  HookDefinitions[type][eventName] = {
    webpackId,
    eventName,
    type,
    async: !!async,
    isAsync: !!async,
    paramNames
  }
}

export const defineCompilerHook = (...args) => defineHook('compiler', ...args)

export const defineCompilationHook = (...args) => defineHook('compilation', ...args)

export const defineParserHook = (...args) => defineHook('parser', ...args)

export const defineMainTemplateHook = (...args) => defineHook('mainTemplate', ...args)

// handle webpacks compiler watch-run event.
export function compilerIsWatching (project, watching, callback) { }

// handle webpacks compiler compilation event.
export function compilationIsReady (project, compilation) { }

// handle webpacks compiler compile event.
export function didEnterCompilePhase (project, ) { }

// handle webpacks compiler make event.
export function handleMake (project, compilation) { }

// handle webpacks compiler after-compile event.
export function didFinishCompilePhase (project, compilation) { }

// handle webpacks compiler emit event.
export function willEmit (project, compilation, callback) { }

// handle webpacks compiler after-emit event.
export function didEmit (project, compilation, callback) { }

// handle webpacks compiler done event.
export function compilerIsDone (project, stats) { }

// handle webpacks compiler done event.
export function compilerProducedStats (project, stats) { }

// handle webpacks compiler failed event.
export function compilerDidFail (project, err) { }

// handle webpacks compiler invalid event.
export function compilerDetectedChange (project, ) { }

// handle webpacks compilation normal-module-loader event.
export function willLoadModules (project, loaderContext, module) { }

// handle webpacks compilation seal event.
export function willSeal (project, ) { }

// handle webpacks compilation optimize event.
export function willOptimize (project, ) { }

// handle webpacks compilation optimize-tree event.
export function willOptimizeTree (project, chunks, modules, callback) { }

// handle webpacks compilation optimize-chunks event.
export function willOptimizeChunks (project, chunks) { }

// handle webpacks compilation after-optimize-chunks event.
export function didOptimizeChunks (project, chunks) { }

// handle webpacks compilation optimize-modules event.
export function willOptimizeModules (project, modules) { }

// handle webpacks compilation after-optimize-modules event.
export function didOptimizeModules (project, modules) { }

// handle webpacks compilation after-optimize-module-ids event.
export function didOptimizeModuleIds (project, modules) { }

// handle webpacks compilation optimize-chunk-assets event.
export function willOptimizeChunkAssets (project, chunks, callback) { }

// handle webpacks compilation after-optimize-chunk-assets event.
export function didOptimizeChunkAssets (project, chunks) { }

// handle webpacks compilation optimize-assets event.
export function willOptimizeAssets (project, assets, callback) { }

// handle webpacks compilation after-optimize-assets event.
export function didOptimizeAssets (project, assets) { }

// handle webpacks compilation build-module event.
export function willBuildModule (project, module) { }

// handle webpacks compilation succeed-module event.
export function moduleWasSuccessful (project, module) { }

// handle webpacks compilation failed-module event.
export function moduleWasFailure (project, module) { }

// handle webpacks compilation module-asset event.
export function didAddModuleAssets (project, module, filename) { }

// handle webpacks compilation chunk-asset event.
export function didAddChunkAsset (project, chunk, filename) { }

// handle webpacks compilation before-hash event.
export function beforeHash (project, ) { }

// handle webpacks compilation after-hash event.
export function afterHash (project, ) { }

// handle webpacks compilation record event.
export function willRecord (project, compilation, records) { }
