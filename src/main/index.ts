import { app, shell, BrowserWindow, ipcMain } from 'electron'
const { spawn } = require('child_process')
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// @ts-ignore
import path = require('path')
import { jsonToDzn, writeStringToFile } from '../util/mzn'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// ipcMain.on('ls', () => {
//   executeCommand('ls')
// })

ipcMain.handle('get:ls', () => {
  return new Promise((resolve) => {
    const ls = spawn('ls', ['-lh'])
    ls.stdout.on('data', (data) => {
      console.table(`stdout: ${data}`)
      resolve(data.toString())
    })
  })
})

ipcMain.handle('mini:example', () => {
  return new Promise((resolve) => {
    const ls = spawn('minizinc', [
      '--solver',
      'Gecode',
      './minizinc/model.mzn',
      './minizinc/data.dzn'
    ])
    ls.stdout.on('data', (data) => {
      console.table(`stdout: ${data}`)
      resolve(data.toString())
    })
  })
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ipcMain.handle('mini:exec', (e, data) => {
  console.log(app.isPackaged)
  let args: string[] = []
  if (app.isPackaged) {
    args = ['--solver', 'Gecode', './model.mzn', './data.dzn']
  } else {
    args = ['--solver', 'Gecode', './src/minizinc/model.mzn', './src/minizinc/data.dzn']
  }

  const dznData = jsonToDzn(data)
  if (app.isPackaged) {
    writeStringToFile('./data.dzn', dznData)
  } else {
    writeStringToFile('./src/minizinc/data.dzn', dznData)
  }

  //const hola = path.join(process.resourcesPath, '..', 'model.mzn')
  // const model = path.join(__dirname, 'minizinc', 'model.mzn')
  // const dataf = path.join(__dirname, 'minizinc', 'data.dzn')
  console.log(path.join(__dirname))
  return new Promise((resolve) => {
    const ls = spawn('minizinc', args)

    ls.stdout.on('data', (data) => {
      console.table(`stdout: ${data}`)
      resolve(data.toString())
    })
    ls.stderr.on('data', (data) => {
      console.error(`stdout: ${data}`)
    })
  })
})
