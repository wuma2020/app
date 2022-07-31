//截图功能
$("#short-cut-button").click(function (e) {
  console.log("截图功能")

  //弹出弹窗
  desktopWindow()

});



var desktopCapturer = require('electron').desktopCapturer

console.log(desktopCapturer)

const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow


var desktopWindow = () => {
  const currWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  console.log(currWindow)
  currWindow.loadFile('./src/static/cut_window.html')
}

//生效了 这里可以做绘制截图的页面
// desktopWindow()
