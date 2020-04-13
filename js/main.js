function openWhatsapp() {
  document.getElementById('whatsapp-popup').style.display = 'block';
}

function closeWhatsapp() {
  document.getElementById('whatsapp-popup').style.display = 'none';
}

function isMobile() {
  try {
    if (
      /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    }
    return false;
  } catch (e) {
    console.log('Error in isMobile');
    return false;
  }
}

document.getElementById('sendWhatsapp').onsubmit = function () {
  const msg = document.getElementById('sent-msg').value;
  if (isMobile()) {
    window.open(
      'whatsapp://send/?phone=56963472861&text=' +
        encodeURI(msg) +
        '&source&data'
    );
  } else {
    window.open(
      'https://web.whatsapp.com/send?phone=56963472861&text=' +
        encodeURI(msg) +
        '',
      '_blank'
    );
  }
  return false;
};
