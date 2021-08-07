const urllib = require('urllib')
const settings = require('../utils/settings').getSettings()

async function setScene(group, scene) {
  urllib
    .request(`http://${settings.hue.ip}/api/${settings.hue.user}/groups/${group}/action`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      content: JSON.stringify({
        scene: scene
      })
    })
    .catch((error) => {
      console.log('🔴: ' + error)
    })
}

async function getAllScenes() {
  let scenes = await urllib
    .request(`https://${settings.hue.ip}/api/${settings.hue.user}/scenes`, { method: 'GET' })
    .catch((error) => {
      console.log('🔴: ' + error)
    })
  return scenes
}

module.exports = {
  setScene,
  getAllScenes
}
