let i = 0;
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const btns = document.querySelectorAll('.btn')
const inputs = document.querySelectorAll('.filters input')
const setProps = document.documentElement.style
const image = document.querySelector('.image');
const btnNext = document.querySelector('.btn-next');


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


// --------------------------------------NEXT IMG

btnNext.addEventListener('click', () => {
  const index = i % images.length;
  const imageSrc = getLinkImg() + images[index];
  image.src = imageSrc;
  image.onload = () => {
    image.src = imageSrc;
  };

  i++;
  btnNext.disabled = true;
  setTimeout(function () { btnNext.disabled = false }, 1000);
});

// --------------------------------------LOAD FILE

document.querySelector('input[type="file"]').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    image.src = reader.result;
  }
  reader.onerror = () => {
    console.log(reader.error);
  };
  console.log(file);
  console.dir(e.target);
  console.dir(reader);
})

// --------------------------------------SAVE IMG

document.querySelector('.btn-save').addEventListener('click', () => {
  // image.attr({
  //   target: '_blank',
  //   href: 'http://localhost/directory/file.pdf'
  // });
  document.downloads.download({ url: image.src })
  console.log(image.src);
})

// --------------------------------------FUNCTION

function getLinkImg() {
  const linkFragment = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
  const date = new Date()
  const time = date.getHours()
  if (time >= 6 && time <= 12) { return linkFragment + "morning/" }
  if (time > 12 && time <= 18) { return linkFragment + "day/" }
  if (time > 18 && time <= 24) { return linkFragment + "evening/" }
  if (time >= 0 && time < 6) { return linkFragment + "night/" }
}

function turnOffFullscreen(e) {
  document.addEventListener("keypress", function (e) {
    if (e.key === 'Escape') {
      toggleFullScreen();
    }
  }, false);
}



