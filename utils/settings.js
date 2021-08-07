const fs = require('fs')
const settingsDB = require('../config/settings.json')

const saveSettings = function (settings) {
  fs.writeFile('./config/settings.json', JSON.stringify(settings), function writeJSON(err) {
    if (err) return console.log(err)
  })
}

const getSettings = function () {
  return settingsDB
}

module.exports = {
  saveSettings,
  getSettings
}
