// main.js
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const { Menu } = require('electron/main')
const fs = require('fs')
const path = require('path')
// const elema = require('./elema')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './src/render/js/preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })

  // require('./preload')
  // 加载 index.html
  mainWindow.loadFile('index.html')
  if (process.platform === 'darwin') {
    app.dock.setIcon(path.join(__dirname, './src/main/image/makalong.png'))
    app.dock.name = "wuma"

  }
  app.name = "wuma"
  app.title = "wuma"
  // 打开开发工具
  mainWindow.webContents.openDevTools()
}


// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {

  createWindow()

  //初始化模块
  initMainJS()

})


// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


const initMainJS = () => {
  //加载src/main/js 下的主进程js
  var pathPre = './src/main/js'
  var pathArray = fs.readdirSync(pathPre)
  pathArray.forEach((value) => {
    require(pathPre + '/' + value)
  })
}


