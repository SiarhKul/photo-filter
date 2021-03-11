let i = 0;
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const btns = document.querySelectorAll('.btn')
const inputs = document.querySelectorAll('.filters input')
const setProps = document.documentElement.style
const image = document.querySelector('.image');
const btnNext = document.querySelector('.btn-next');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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

document.querySelector('.btn-reset').addEventListener('click', () => {
  inputs.forEach(input => {
    ctx.filter = `${input.name}(${input.value = 0}${input.dataset.sizing})`;
    ctx.drawImage(image, 0, 0);
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

// --------------------------------------LOAD FILE

document.querySelector('input[type="file"]').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file)

  reader.onload = () => {
    image.src = reader.result;
  }

  reader.onerror = () => {
    console.log(reader.error);
  };
})

// --------------------------------------SAVE IMG


document.querySelector('.btn-save').addEventListener('click', (e) => {
  //только по с внутреннего ресурса
  // var link = document.createElement('a');
  // link.download = 'download.png';
  // link.href = image.src;
  // link.click();
  // link.delete;

  console.log(canvas.toDataURL());
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
})


// --------------------------------------FILTERS___NO
document.querySelector('.filters').addEventListener('input', (e) => {
  const suffixCssProps = e.target.dataset.sizing || '';
  const nameCssProps = e.target.name
  const valueCssProps = e.target.value
  const outputValue = e.target.nextElementSibling
  outputValue.value = valueCssProps

  ctx.filter = `${nameCssProps}(${valueCssProps}${suffixCssProps})`;
  ctx.drawImage(image, 0, 0);

})
// --------------------------------------NEXT IMG___NO

btnNext.addEventListener('click', drawImage);


function drawImage() {
  const index = i % images.length;
  const imageSrc = getLinkImg() + images[index];
  const ctx = canvas.getContext("2d");
  // const img = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = imageSrc
  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  };
  i++;
}
drawImage();

//! --------------------------------------FUNCTION

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



