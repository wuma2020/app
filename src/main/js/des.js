const {screen,desktopCapturer, shell,contextBridge,ipcMain, ipcRenderer} = require('electron')
const path = require('path')
const fs = require('fs')


const ttt = () => {
    const msg = [];
    console.log(screen,desktopCapturer)
    const thumbSize = determineScreenShotSize()
    let options = { types: ['screen'], thumbnailSize: thumbSize }
  
    // desktopCapturer.getSources({ types: ['screen'] }).then()
    var msgtemp = desktopCapturer.getSources(options).then( (sources) => {
      // if (error) return console.log(error)

      sources.forEach(async (source,event) => {
  
        if (source.name === 'Entire Screen' || source.name === 'Screen 2') {
          screenshotPath = path.join(__dirname, '../image/screenshot1.png')
          // fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
          //   if (error) return console.log(error)
        //     // shell.openExternal(`file://${screenshotPath}`)
            var mesTemp = `截图保存到: ${screenshotPath}`;
            msg.push(mesTemp)
            return msg;
          // })
        }
      })
    })
    .then( () =>{
    // todo 这里返回值还是有问题
    return msg[0];
    })
    return msgtemp;
  }
  
  
var determineScreenShotSize  = () => {
  console.log(screen)
  const screenSize = 200
  //screen.getPrimaryDisplay().workAreaSize
  const maxDimension = 200
  //Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * 100,
    height: maxDimension * 100
  }
}
  
ipcMain.handle('shortchat',async (event,data) =>{
    var temp = ttt();
    console.log("after ")
    return temp;
})
