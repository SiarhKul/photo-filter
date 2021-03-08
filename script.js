const btns = document.querySelectorAll('.btn')
const inputs = document.querySelectorAll('.filters input')
const setProps = document.documentElement.style

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

document.querySelector('.btn-reset').addEventListener('click', () => {
  inputs.forEach(input => {
    setProps.setProperty(`--${input.name}`, input.value + input.sizing)
    console.log(input.name === 'saturate')

    input.name === 'saturate'
      ? input.value = 100
      : input.value = 0
    input.name === 'saturate'
      ? input.nextElementSibling.value = 100
      : input.nextElementSibling.value = 0
  })
})

document.querySelector('.editor').addEventListener('click', ({ target: { parentElement, tagName, classList } }) => {
  if (tagName === 'BUTTON') {
    btns.forEach(b => { b.classList.remove('btn-active') })
    classList.add('btn-active')
  };

  if (tagName === 'INPUT') {
    btns.forEach(b => { b.classList.remove('btn-active') })
    parentElement.classList.add('btn-active');
  };
})



// --------------------------------------FUNCTION
function turnOffFullscreen(e) {
  document.addEventListener("keypress", function (e) {
    if (e.key === 'Escape') {
      toggleFullScreen();
    }
  }, false);
}


