console.log("dialog.js loaded")
const {dialog} =  require('electron')

dialog.showMessageBox('mainWindow',{
    title:"wuma title", 
    message:"messafe aa",
    buttons: ["ok","error"]

})


