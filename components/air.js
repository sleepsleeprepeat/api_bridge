const urllib = require('urllib')
const settings = require('../utils/settings').getSettings()

async function setInHighSpeed(rpm) {
  makeRequest({ ':1da': { Value: rpm } })
}

async function setOutHighSpeed(rpm) {
  makeRequest({ ':1d3': { Value: rpm } })
}

async function setInLowSpeed(rpm) {
  makeRequest({ ':1db': { Value: rpm } })
}

async function setOutLowSpeed(rpm) {
  makeRequest({ ':1d4': { Value: rpm } })
}

async function startLow() {
  makeRequest({ ':73d': { Value: 2 } })
}

async function startHigh() {
  makeRequest({ ':73d': { Value: 3 } })
}

async function stopNormal() {
  makeRequest({ ':73d': { Value: 4 } })
}

function makeRequest(parameters) {
  urllib
    .request(`http://${settings.air.ip}/bus/cgi/parameter.cgi`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      digestAuth: `${settings.air.user}:${settings.air.pw}`,
      content: JSON.stringify({ Write: { Parameters: parameters } })
    })
    .catch((error) => {
      //console.log('🔴: ' + error)
    })
}

module.exports = {
  setInHighSpeed,
  setOutHighSpeed,
  setInLowSpeed,
  setOutLowSpeed,
  startLow,
  startHigh,
  stopNormal
}
