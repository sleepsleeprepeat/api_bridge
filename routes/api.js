const express = require('express')
const router = express.Router()

const db = require('../utils/db')
const comps = require('../utils/components')

router.get('/:routeName', async (req, res) => {
  console.log(req.params.routeName + 'TES')
  let routeName = req.params.routeName.substring(0, req.params.routeName - 6)

  console.log(routeName + 'GEFT')

  if (!db.isNewRoute(routeName)) {
    route = db.getRouteByName(routeName)
    if (route.type === 'hue') {
      res.sendStatus(200)
      comps.hue.setScene(route.group, route.scene)
    } else if (route.type === 'air') {
      res.sendStatus(200)
      let amount = parseInt(route.amount)
      switch (route.command) {
        case 'setLowSpeed':
          comps.air.setInLowSpeed(amount)
          comps.air.setOutLowSpeed(amount)
          break

        case 'setHighSpeed':
          comps.air.setInHighSpeed(amount)
          comps.air.setOutHighSpeed(amount)
          break

        case 'startLow':
          comps.air.startLow()
          break

        case 'startHigh':
          comps.air.startHigh()
          break

        case 'stopNormal':
          comps.air.stopNormal()
          break
      }
    } else {
      res.send(404)
    }
  } else {
    res.send(404)
  }
})

module.exports = router
