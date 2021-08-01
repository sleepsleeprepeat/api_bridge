const express = require("express")
const router = express.Router()

const db = require("../utils/db")
const comps = require("../utils/components")

router.get("/:routeName", async (req, res) => {
  if (!db.isNewRoute(req.params.routeName)) {
    route = db.getRouteByName(req.params.routeName)
    if (route.type === "hue") {
      res.sendStatus(200)
      comps.hue.setScene(route.group, route.scene)
    }
  }
})

module.exports = router
