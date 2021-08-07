const fs = require('fs')
const routesDB = require('../config/routes.json')

function createHueRoute(name, scene, group) {
  createRoute({
    type: 'hue',
    name: name,
    scene: scene,
    group: group
  })
}

function createAirRoute(name, command, amount) {
  createRoute({
    type: 'air',
    name: name,
    command: command,
    amount: amount
  })
}

function createRoute(route) {
  routesDB.push(route)
  fs.writeFile('./config/routes.json', JSON.stringify(routesDB), function writeJSON(err) {
    if (err) return console.log('🔴 ' + err)
  })
  console.log('🟢 saved: ' + JSON.stringify(route))
}

function deleteRoute(name) {
  let route = getRouteByName(name)
  let index = getRouteIndex(name)
  routesDB.splice(index, 1)
  fs.writeFile('./config/routes.json', JSON.stringify(routesDB), function writeJSON(err) {
    if (err) return console.log('🔴 ' + err)
  })
  console.log('🟢 deleted: ' + JSON.stringify(route))
}

function getRouteByName(name) {
  let route = routesDB.find((x) => x.name === name)
  if (route === undefined) {
    return null
  }
  return route
}

function getRouteIndex(name) {
  return routesDB.findIndex((x) => x.name === name)
}

function getAllRoutes() {
  return routesDB
}

function isNewRoute(name) {
  const route = routesDB.find((x) => x.name == name)
  if (route) return false
  return true
}

module.exports = {
  createRoute,
  createHueRoute,
  createAirRoute,
  deleteRoute,
  getRouteByName,
  getRouteIndex,
  getAllRoutes,
  isNewRoute
}
