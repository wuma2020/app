
//===================初始化html===================
const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {

    console.log(link)
    let template = link.import.querySelector('.template')

    console.log(template)

    let clone = document.importNode(template.content, true)

    if (link.href.match('head.html')) {
        document.querySelector('head').appendChild(clone)
    }

    if (link.href.match('body.html')) {
        document.querySelector('body').appendChild(clone)
    }
})



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

screenshot.addEventListener('click', async () => {
    var filePath = await window.electrona.mykk()
    // screenshotMsg.innerHTML = filePath;
    // console.log(filePath)
})


