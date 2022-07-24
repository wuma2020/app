
const NOTIFICATION_TITLE = '网络变化通知'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

const updateOnlineStatus = () => {
    document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'

    new Notification(NOTIFICATION_TITLE, { body: navigator.onLine ? '上线' : '下线' })
    .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE
  
}
  
window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()


//===================截图===================
const screenshot = document.getElementById('screen-shot')
const screenshotMsg = document.getElementById('screenshot-path')

screenshot.addEventListener('click',async ()=>{
    var filePath = await window.electrona.mykk()
    screenshotMsg.innerHTML = filePath;
    console.log(filePath)
})




