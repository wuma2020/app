//渲染进程

const os =  require('os')

const cpuInfos =  os.cpus()


console.log(cpuInfos[0].times.user)
console.log(cpuInfos)


//=====================

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer ,contextBridge} = require('electron')

ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
  try {
    console.log("ipcRenderer on ")
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720
        }
      }
    })
    handleStream(stream)
  } catch (e) {
    handleError(e)
  }
})

ipcRenderer.on('ipcRendererShortcut',(data)=>{
  console.log("ipcRendererShortcut " + data)
})


function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}



contextBridge.exposeInMainWorld('electrona',
{
  mykk: () => {
    var aa = ipcRenderer.invoke('shortchat',"aa")
    console.log("pre test " + aa)
    return aa;
  }
})




