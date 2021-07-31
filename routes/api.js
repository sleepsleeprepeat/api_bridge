const express = require("express")
const axios = require("axios")
const router = express.Router()

const db = require("../utils/db")
const settings = require("../utils/settings").getSettings()

router.get("/:routeName", async (req, res) => {
  if (!db.isNewRoute(req.params.routeName)) {
    route = db.getRouteByName(req.params.routeName)
    if (route.type === "hue") {
      console.log("🟢 send Hue command")
      res.sendStatus(200)
      axios
        .put(`http://${settings.hue.ip}/api/${settings.hue.user}/groups/${route.group}/action`, {
          scene: route.scene
        })
        .catch((error) => {
          console.log("🔴 Hue error: " + error)
        })
    }
  }
})

module.exports = router
