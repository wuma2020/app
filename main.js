// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow ,ipcMain,Notification} = require('electron')
const path = require('path')
// const elema = require('./elema')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './src/render/js/preload.js'),
      // nodeIntegrationInWorker: true,
      // nodeIntegration: true,
      // contextIsolation: false,
      // enableRemoteModule: true
    }
  })

  // require('./preload')
  // 加载 index.html
  mainWindow.loadFile('index.html')
  if(process.platform === 'darwin'){
    app.dock.setIcon(path.join(__dirname, './src/main/image/makalong.png'))

  }
  app.name = "wuma"
  // 打开开发工具
  mainWindow.webContents.openDevTools()
}


// function handleSetTitle (event, title) {
//   const webContents = event.sender
//   const win = BrowserWindow.fromWebContents(webContents)
//   win.setTitle(title)
// }
// const NOTIFICATION_TITLE = '通知名称'
// const NOTIFICATION_BODY = '通知内容'

// function showNotification () {
//   new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
// }

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  // app.on('activate', () => {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })

  require('./src/main/js/des.js')
})
// .then(()=>{
//   showNotification();
// })

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})



