const axios = require("axios")
const settings = require("../utils/settings").getSettings()

function setHueScene(group, scene) {
  axios
    .put(`http://${settings.hue.ip}/api/${settings.hue.user}/groups/${group}/action`, {
      scene: scene
    })
    .catch((error) => {
      console.log("Error in Hue component" + error)
    })
}

module.exports = {
  setHueScene
}
