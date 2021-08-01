const axios = require("axios")
const settings = require("../utils/settings").getSettings()

async function setScene(group, scene) {
  axios
    .put(`http://${settings.hue.ip}/api/${settings.hue.user}/groups/${group}/action`, {
      scene: scene
    })
    .catch((error) => {
      console.log("🔴: " + error)
    })
}

async function getAllScenes() {
  // let scenes = await axios
  //   .get(`https://${settings.hue.ip}/api/${settings.hue.user}/scenes`)
  //   .catch((error) => {
  //     console.log("🔴: " + error)
  //   })
  let scenesData = require("../config/hue.json").scenes
  return scenesData
}

module.exports = {
  setScene,
  getAllScenes
}
