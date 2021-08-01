const express = require("express")
const router = express.Router()
const db = require("../utils/db")

const formParser = express.urlencoded({ extended: true })

const settings = require("../utils/settings").getSettings()
const comps = require("../utils/components")

router.get("/", async (req, res) => {
  res.render("create")
})

router.post("/", formParser, async (req, res) => {
  let type = req.body.type

  if (type === "hue") {
    res.redirect(`/create/hue`)
  } else {
    res.redirect("/create")
  }
})

router.get("/:type", async (req, res) => {
  let scenesData = await comps.hue.getAllScenes()
  let scenes = []
  for (const key in scenesData) {
    scenes.push({ id: key, name: scenesData[key].name, group: scenesData[key].group })
  }

  let type = req.params.type
  if (type === "hue") {
    res.render("/create_hue", { scenes: scenes, err_msg: req.flash("err_msg") })
  } else {
    res.redirect("/create")
  }
})

router.post("/hue", formParser, async (req, res) => {
  let scenesData = await comps.hue.getAllScenes()
  let scenes = []
  for (const key in scenesData) {
    scenes.push({ id: key, name: scenesData[key].name, group: scenesData[key].group })
  }

  if (db.isNewRoute(req.body.name)) {
    if (req.body.name.match(/^[a-z\d+-]+$/)) {
      db.createHueRoute(req.body.name, req.body.hueScene, scenesData[req.body.hueScene].group)
      res.render("create_success", {
        route: `${settings.routePrefix}/api/${req.body.name}`
      })
      return
    } else {
      req.flash("err_msg", "Name can only contain lowercase letters a-z and -")
      res.render("create_hue", { scenes: scenes, err_msg: req.flash("err_msg") })
    }
  } else {
    req.flash("err_msg", "Name already exists")
    res.render("create_hue", { scenes: scenes, err_msg: req.flash("err_msg") })
  }
})

module.exports = router
