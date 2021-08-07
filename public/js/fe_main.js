function showHideField(that, values, elementId) {
  console.log('TEST')
  if (values.includes(that.value)) {
    document.getElementById(elementId).style.display = 'block'
  } else {
    document.getElementById(elementId).style.display = 'none'
  }
}
