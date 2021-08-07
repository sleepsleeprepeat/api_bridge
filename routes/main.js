const express = require('express')
const router = express.Router()
const db = require('../utils/db')

const formParser = express.urlencoded({ extended: true })

const settingsDB = require('../utils/settings')
const settings = settingsDB.getSettings()

router.get('/', async (req, res) => {
  res.redirect('/routes')
})

router.get('/routes', async (req, res) => {
  let routes = db.getAllRoutes()
  routes.forEach((route) => {
    route.url = `${settings.routePrefix}/api/${route.name}`
  })
  res.render('routes', { routes: routes })
})

router.get('/delete/:name', async (req, res) => {
  res.render('delete', { name: req.params.name })
})

router.post('/delete', formParser, async (req, res) => {
  db.deleteRoute(req.body.name)
  res.render('delete_success', { route: req.body.name })
})

router.get('/settings', async (req, res) => {
  res.render('settings', { settings: settings })
})

router.post('/settings', formParser, async (req, res) => {
  settings.hue.ip = req.body.hueIp
  settings.hue.user = req.body.hueUser
  settings.routePrefix = req.body.routePrefix
  settings.air.ip = req.body.airIp
  settings.air.user = req.body.airUser
  settings.air.pw = req.body.airPw
  settingsDB.saveSettings(settings)
  res.redirect('/settings')
})

module.exports = router
