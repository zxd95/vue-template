// popProgressBar.js
import popProgressBar from './popProgressBar.js'

let messageInstance

function getMessageInstance() {
  messageInstance = messageInstance || popProgressBar.newInstance()
  return messageInstance
}

function progressStart({
  title = '',
  duration = 1,
  thickness = 20,
  suspend = false
}) {
  let instance = getMessageInstance()

  instance.start({
    title: title,
    duration: duration,
    thickness: thickness,
    suspend: suspend
  })
}

function progressClose() {
  let instance = getMessageInstance()

  instance.close()
}

export default {
  start(options) {
    return progressStart(options)
  },
  close() {
    return progressClose()
  }
}
