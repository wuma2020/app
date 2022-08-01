//截图功能

// const desktopCapturer = require('electron').remote.desktopCapturer
const { screen } = require('electron').remote
var desktopCapturer = require('electron').desktopCapturer

const fs = require('fs')
const os = require('os')
const path = require('path')

let captureWins = []

$("#short-cut-button").click(function (e) {
  console.log("截图功能")

  //弹出弹窗
  // desktopWindow()

  $("#short-cut-input").val('正在截取屏幕...');

  const thumbSize = determineScreenShotSize()
  let options = { types: ['screen', 'window'], thumbnailSize: thumbSize }


  // desktopCapturer.getSources(options).then((error,sources) => {
  //   if (error) return console.log(error)

  //   sources.forEach((source) => {
  //     if (source.name === 'Entire Screen' || source.name === 'Screen 1') {
  //       const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')

  //       console.log(source.thumbnail.toDataURL())
  //       // fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
  //       //   if (error) return console.log(error)
  //       //   shell.openExternal(`file://${screenshotPath}`)

  //       //   const message = `截图保存到: ${screenshotPath}`
  //       //   screenshotMsg.textContent = message
  //       // })
  //     }
  //   })
  // })

});


function determineScreenShotSize() {
  const screenSize = 200
  //screen.getPrimaryDisplay().workAreaSize
  const maxDimension = 200
  //Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * 1,
    height: maxDimension * 1
  }
}

$('#video')
$('#startButton')
$('#stopButton')
$('#videoSelect').click(getVideonSources)


const { remote }= require('electron')
const Menu = remote.Menu
// 获取可用的视频源
async function getVideonSources(){

  const sources = await desktopCapturer.getSources({types:['window','screen']});

  var videoOptionMenu = Menu.buildFromTemplate(
    sources.map(source =>{
      return {
        label: source.name,
        click: () => selectSource(source)
      }
    })
  );
  videoOptionMenu.popup();
}


//视频记录对象
let mediaRecorder;
const recordedChunks = [];

//显示视频原
async function selectSource(source){
  
  //设置选中的视频原
  $('#videoSelect').text(source.name)

  const mediaOptions = {
    audio : false,
    video : {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id
      }
    }
  }

  //获取指定视频原的视频流
  const stream = await navigator.mediaDevices.getUserMedia(mediaOptions);

  //展示视频原
  $('#video')[0].srcObject = stream;
  $('#video')[0].play();


  //创建一个视频记录流
    // Create the Media Recorder
    // const options = { mimeType: 'video/webm; codecs=vp9' };
    // mediaRecorder = new MediaRecorder(stream, options);
  
    // // Register Event Handlers
    // mediaRecorder.ondataavailable = handleDataAvailable;
    // mediaRecorder.onstop = handleStop;

}