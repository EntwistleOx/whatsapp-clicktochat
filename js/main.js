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

function openWhatsApp() {
  if (isMobile()) {
    window.open(
      'whatsapp://send/?phone=56963472861&text=Hola!%20me%20ayudan?&source&data'
    );
  } else {
    window.open(
      'https://web.whatsapp.com/send?phone=56963472861&text=Hola!%20me%20ayudan?',
      '_blank'
    );
  }
}
