//截图功能

// const desktopCapturer = require('electron').remote.desktopCapturer
const { screen } = require('electron').remote
var desktopCapturer = require('electron').desktopCapturer

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
//开始录屏
$('#videoSelect').click(getVideonSources)


const { remote, dialog } = require('electron')
const { error } = require('console')
const Menu = remote.Menu
// 获取可用的视频源
async function getVideonSources() {

  const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });

  var videoOptionMenu = Menu.buildFromTemplate(
    sources.map(source => {
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
async function selectSource(source) {

  //设置选中的视频原
  $('#videoSelect').text(source.name)

  const mediaOptions = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id
      }
    }
  }

  //获取指定视频原的视频流
  const stream = await navigator.mediaDevices.getUserMedia(mediaOptions);


  // =================================使用navigator.mediaDevices.getDisplayMedia来进行获取数据
  // var displayMediaOptions = {
  //   video: {
  //     cursor: "always"
  //   },
  //   audio: false
  // }

  // try {
  //   $('#video')[0].srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

  //   var videoTracks = $('#video')[0].srcObject.getVideoTracks()[0];

  //   console.info(videoTracks)
  // } catch (error) {
  //   console.info(error)
  // }
  // =================================使用navigator.mediaDevices.getDisplayMedia来进行获取数据



  //展示视频原
  $('#video')[0].srcObject = stream;
  $('#video')[0].play();

  var options = {
    // audioBitsPerSecond?: number;
    // bitsPerSecond?: number;
    mimeType: 'video/webm'
    // videoBitsPerSecond?: number;
  };

  //创建一个视频记录流
  mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.ondataavailable = handleDataAvaliable;
  mediaRecorder.onstop = handleStop;

  // 处理开始和结束
  function handleDataAvaliable(event) {
    recordedChunks.push(event.data);
  }

  //获取dialog
  const dialog = require('electron').remote.dialog;
  const fs = require('fs');

  //处理录屏结束按钮
  function handleStop(event) {
    console.log('handleStop');
    // 创建blob对象，进行存储
    const blob = new Blob(recordedChunks, { type: 'video/webm' });

    //设置路径
    var filePath = dialog.showSaveDialogSync({
      buttonLabel: '保存文件',
      defaultPath: `录屏-${Date.now()}.webm`,
    });

    console.log(filePath);

    var fileReader = new FileReader();
    fileReader.onload = function () {
      console.log(this.result);
      fs.writeFile(filePath, Buffer.from(this.result),(err) => {
        console.log(err); 
      });
    };
    fileReader.readAsArrayBuffer(blob);

    // var blobBuffer = blob.arrayBuffer();
    // var buffer = Buffer.from(blobBuffer);
    // writeFile.writeFileSync(filePath, buffer);
    // fs.writeFileSync(filePath,  buffer,{ flag: 'w+' },err => {
    //   console.log(err );
    // });

  }

}

//开始记录
$('#startButton').click(() => {
  mediaRecorder.start();
  console.log('start 记录');
  $('#tip_info').text('开始记录中...');
})


$('#stopButton').click(() => {
  mediaRecorder.stop();
  $('#tip_info').text('未开始记录...');
})

