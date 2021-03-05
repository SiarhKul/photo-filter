

document.querySelector('.fullscreen').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      turnOffFullscreen()
    }
  }
})

document.addEventListener('keydown', turnOffFullscreen)

document.querySelector('.filters').addEventListener('input', (e) => {

  const suffixCssProps = e.target.dataset.sizing || '';
  const nameCssProps = e.target.name
  const valueCssProps = e.target.value
  const outputValue = e.target.nextElementSibling

  document.documentElement.style.setProperty(`--${nameCssProps}`, valueCssProps + suffixCssProps)
  outputValue.value = valueCssProps
})

document.querySelector('.btn-reset').addEventListener('click', (e) => {
  const setProps = document.documentElement.style
  const inputs = document.querySelectorAll('.filters input')

  inputs.forEach(input => {
    setProps.setProperty(`--${input.name}`, input.value + input.sizing)
    input.name === 'saturate' ? input.value = 100 : input.value = 0
  })

})


// --------------------------------------FUNCTION
function turnOffFullscreen(e) {
  document.addEventListener("keypress", function (e) {
    if (e.key === 'Escape') {
      toggleFullScreen();
    }
  }, false);
}


