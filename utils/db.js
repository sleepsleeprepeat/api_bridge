const fs = require("fs")
const routesDB = require("../config/routes.json")

const createHueRoute = function (name, scene, group) {
  createRoute({
    type: "hue",
    name: name,
    scene: scene,
    group: group
  })
}

const createRoute = function (route) {
  routesDB.push(route)
  fs.writeFile("./config/routes.json", JSON.stringify(routesDB), function writeJSON(err) {
    if (err) return console.log("🔴 " + err)
  })
  console.log("🟢 saved: " + JSON.stringify(route))
}

const deleteRoute = function (name) {
  let route = getRouteByName(name)
  let index = getRouteIndex(name)
  routesDB.splice(index, 1)
  fs.writeFile("./config/routes.json", JSON.stringify(routesDB), function writeJSON(err) {
    if (err) return console.log("🔴 " + err)
  })
  console.log("🟢 deleted: " + JSON.stringify(route))
}

const getRouteByName = function (name) {
  let route = routesDB.find((x) => x.name === name)
  if (route === undefined) {
    return null
  }
  return route
}

const getRouteIndex = function (name) {
  return routesDB.findIndex((x) => x.name === name)
}

const getAllRoutes = function () {
  return routesDB
}

const isNewRoute = function (name) {
  const route = routesDB.find((x) => x.name == name)
  if (route) return false
  return true
}

module.exports = {
  createRoute,
  createHueRoute,
  deleteRoute,
  getRouteByName,
  getRouteIndex,
  getAllRoutes,
  isNewRoute
}
