
//===================初始化html===================
var initHtml = () => {

  const updateOnlineStatus = () => {
    const NOTIFICATION_TITLE = '网络变化通知'
    const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
    const CLICK_MESSAGE = 'Notification clicked!'

    $('#status').html(navigator.onLine ? 'online' : 'offline')

    new Notification(NOTIFICATION_TITLE, { body: navigator.onLine ? '上线' : '下线' })
      .onclick = () => $("#output").text(CLICK_MESSAGE)

  }

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  updateOnlineStatus()


  //===================截图===================
  var screenshot = document.getElementById('screen-shot')
  const screenshotMsg = document.getElementById('screenshot-path')

  // screenshot.onclick(async () => {
  //   var filePath = await window.electrona.mykk()
  // }
  // )

  $("#screen-shot").click(async () => {
    var filePath = await window.electrona.mykk()
  })


}

$(initHtml())




// screenshot.addEventListener('click', async () => {
//   var filePath = await window.electrona.mykk()
//   // screenshotMsg.innerHTML = filePath;
//   // console.log(filePath)
// })


