const express = require("express")
const axios = require("axios")
const router = express.Router()
const db = require("../utils/db")

const formParser = express.urlencoded({ extended: true })

const settingsDB = require("../utils/settings")
const settings = settingsDB.getSettings()

router.get("/", async (req, res) => {
  res.redirect("/routes")
})

router.get("/settings", async (req, res) => {
  res.render("settings", { settings: settings })
})

router.post("/settings", formParser, async (req, res) => {
  settings.hue.ip = req.body.hueIp
  settings.hue.user = req.body.hueUser
  settings.routePrefix = req.body.routePrefix
  settingsDB.saveSettings(settings)
  res.redirect("/settings")
})

router.get("/create", async (req, res) => {
  res.render("create")
})

// TODO: Change out Test-API from Philps Hue with the real one
router.post("/create", formParser, async (req, res) => {
  let selectedType = req.body.selectedType
  let type = req.body.type

  //let scenes = await axios.get(`https://${settings.hue.ip}/api/${settings.hue.user}/scenes`)
  let scenesData = require("../config/hue.json").scenes
  let scenes = []
  for (const key in scenesData) {
    scenes.push({ id: key, name: scenesData[key].name, group: scenesData[key].group })
  }

  if (selectedType === "hue") {
    if (type === "hue") {
      if (db.isNewRoute(req.body.name)) {
        if (req.body.name.match(/^[a-z-]+$/)) {
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
    } else {
      res.render("create_hue", { scenes: scenes, err_msg: req.flash("err_msg") })
    }
  }
})

router.get("/routes", async (req, res) => {
  let routes = db.getAllRoutes()
  routes.forEach((route) => {
    route.url = `${settings.routePrefix}/api/${route.name}`
  })
  res.render("routes", { routes: routes })
})

router.get("/delete/:name", async (req, res) => {
  res.render("delete", { name: req.params.name })
})

router.post("/delete", formParser, async (req, res) => {
  db.deleteRoute(req.body.name)
  res.render("delete_success", { route: req.body.name })
})

module.exports = router
