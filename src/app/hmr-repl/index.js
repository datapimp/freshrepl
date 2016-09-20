const blessed = require('blessed')
const { join } = require('path')

screen = blessed.screen({
  smartCSR: true,
  log: join(process.cwd(), 'hmr-repl.log')  ,
  fullUnicode: true,
  dockBorders: true,
  ignoreDockContrast: true
});

const top = blessed.terminal({
  parent: screen,
  cursor: 'line',
  cursorBlink: true,
  screenKeys: false,
  label: 'Webpack',
  left: 0,
  top: 0,
  width: '99%',
  height: '70%',
  border: 'line',
  shell: process.argv[0],
  args: [
    join(process.cwd(),'node_modules','.bin','webpack'),
    '--config',
    join(process.cwd(), 'webpack.config.babel.js')
  ],
  style: {
    fg: 'default',
    bg: 'default',
    focus: {
      border: {
        fg: 'green'
      }
    }
  }
})

const bottom = blessed.terminal({
  parent: screen,
  cursor: 'line',
  cursorBlink: true,
  screenKeys: false,
  label: 'Webpack',
  left: 0,
  top: '71%',
  width: '99%',
  height: '29%',
  border: 'line',
  style: {
    fg: 'default',
    bg: 'default',
    focus: {
      border: {
        fg: 'green'
      }
    }
  }
})

bottom.focus()

screen.render()

screen.key('C-q', function() {
  bottom.kill();
  top.kill();
  return screen.destroy();
})
