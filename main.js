const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const manageWindowBtn = document.getElementById('manage-window')
let win

manageWindowBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, '/app/public/index.html')
  win = new BrowserWindow({ 
      width: 600, 
      height: 600,
      backgroundColor: '#ffffff',
      icon: 'file://, __dirname, /app/public/img/chat.svg'    
})
  win.on('resize', updateReply)
  win.on('move', updateReply)
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
  function updateReply () {
    const manageWindowReply = document.getElementById('manage-window-reply')
    const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    manageWindowReply.innerText = message
  }
})