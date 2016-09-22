export default function (repl) {
  repl.commands['reload'] = {
    help: 'Clears the require cache',
    // eslint-disable-next-line
    action: function() {
      Object.keys(require.cache)
        .filter(key => key.startsWith(process.cwd()))
        .forEach(moduleId => delete(require.cache[moduleId]))

      repl.commands.clear.action.call(repl)
      repl.commands.cls.action.call(repl)
      console.log('Cleared the require context')
      this.displayPrompt()
    },
  }
}
