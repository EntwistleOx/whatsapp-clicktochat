const template = document.createElement('template');
template.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

#whatsapp-clicktochat {
  font-family: 'Roboto', sans-serif;
  line-height: 1.4;
}

/* Whatsapp open button */
.whatsapp-btn-open {
  position: fixed;
  right: 16px;
  bottom: 50px;
  width: 52px;
  z-index: 1000;
  cursor: pointer;
}

.whatsapp-btn-open .btn-open {
  width: 52px;
  height: auto;
  border-radius: 50%;
  box-shadow: 1px 2px 8px rgba(60, 60, 60, 0.25);
}

.whatsapp-btn-open .btn-open:hover {
  box-shadow: 1px 2px 8px rgba(60, 60, 60, 0.6);
}

/* Whatsapp popup - hidden by default */
.whatsapp-popup {
  display: none;
  max-width: 250px;
  position: fixed;
  bottom: 118px;
  right: 16px;
  z-index: 999;
}

/* Whatsapp popup - header */
.whatsapp-popup .whatsapp-popup-header {
  box-shadow: 1px 2px 8px rgba(60, 60, 60, 0.25);
  border-radius: 5px 5px 0 0;
  background: #128c7e;
  color: #fff;
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.whatsapp-popup .whatsapp-popup-header div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.whatsapp-popup .whatsapp-popup-header .header-avatar {
  width: 36px;
  height: 36px;
}

.whatsapp-popup .whatsapp-popup-header .header-avatar .avatar {
  width: 100%;
  border-radius: 50%;
  background: #fff;
}

.whatsapp-popup .whatsapp-popup-header .header-title {
  font-size: 14px;
  padding: 0 8px;
}

.whatsapp-popup .whatsapp-popup-header .header-close {
  width: 8px;
}

.whatsapp-popup .whatsapp-popup-header .header-close:hover {
    opacity: 0.5;
  }

.whatsapp-popup .whatsapp-popup-header .header-close .close {
  width: 100%;
  margin-top: 1px;
}

/* Whatsapp popup - body */
.whatsapp-popup .whatsapp-popup-body {
  cursor: pointer;
  background: #ece5dd;
  border-radius: 0 0 5px 5px;
  box-shadow: 1px 2px 8px rgba(60, 60, 60, 0.25);
}

.whatsapp-popup .whatsapp-popup-body .received {
  background: #fff;
  display: inline-block;
  width: 180px;
  text-align: justify;
  padding: 8px;
  margin: 16px 16px 16px 16px;
  font-size: 12px;
  border-radius: 0px 5px 5px 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  word-wrap: break-word;
}

.whatsapp-popup .whatsapp-popup-body .received:before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0px 8px 8px 0;
  border-color: transparent #fff transparent transparent;
  top: 68px;
  left: 8px;
}

.whatsapp-popup .whatsapp-popup-body .body-send form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 0 8px 8px 8px;
}

.whatsapp-popup .whatsapp-popup-body .body-send .sent-msg {
  width: 70%;
  border-radius: 15px;
  padding: 9px;
  font-size: 12px;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
}

.whatsapp-popup .whatsapp-popup-body .body-send .btn-send {
  background-color: #128c7e;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
}

.whatsapp-popup .whatsapp-popup-body .body-send .btn-send:active {
  background: #075e54;
}

.whatsapp-popup .whatsapp-popup-body .body-send .btn-send .send {
  width: 18px;
}
</style>
<div id="whatsapp-clicktochat">
  <div class="whatsapp-popup" id="whatsapp-popup">
    <div class="whatsapp-popup-header">
      <div>
        <div class="header-avatar">
          <img src="" alt="avatar" class="avatar" />
        </div>
        <div class="header-title">
          <span class="title"></span>
        </div>
      </div>
      <div class="header-close">
        <img
          src=""
          alt="close"
          class="close"
          id="close-popup"
        />
      </div>
    </div>
    <div class="whatsapp-popup-body">
      <div class="body-received">
        <span class="received"></span>
      </div>
      <div class="body-send">
        <form id="send-whatsapp">
          <textarea rows="1" id="sent-msg" class="sent-msg"></textarea>
          <button id="btn-send" class="btn-send" value="">
            <img src="" alt="send" class="send" />
          </button>
        </form>
      </div>
    </div>
  </div>
  <a class="whatsapp-btn-open" id="toggle-popup">
    <img src="" class="btn-open" />
  </a>
</div>
`;

class ClickToChat extends HTMLElement {
  constructor() {
    super();
    this.showPopup = false;
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.phone = this.getAttribute('phone');
    this.shadowRoot.querySelector('.title').innerHTML = this.getAttribute(
      'title'
    );
    this.shadowRoot.querySelector('.received').innerHTML = this.getAttribute(
      'message'
    );
    this.shadowRoot.querySelector('.avatar').src = this.getAttribute('avatar');

    this.shadowRoot.querySelector(
      '.close'
    ).src = `${window.location.href}/click-to-chat/img/close-light.svg`;

    this.shadowRoot.querySelector(
      '.send'
    ).src = `${window.location.href}/click-to-chat/img/send-light.svg`;

    this.shadowRoot.querySelector(
      '.btn-open'
    ).src = `${window.location.href}/click-to-chat/img/whatsapp.svg`;

    console.log(window.location.href);
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
    const popup = this.shadowRoot.querySelector('.whatsapp-popup');
    if (this.showPopup) {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
  }

  isMobile() {
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

  sendWhatsapp(e) {
    const msg = this.shadowRoot.getElementById('sent-msg').value;
    if (this.isMobile()) {
      window.open(
        `whatsapp://send/?phone=${this.phone}&text=${encodeURI(
          msg
        )}&source&data`
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${this.phone}&text=${encodeURI(
          msg
        )}`,
        '_blank'
      );
    }
    // return false;
    e.preventDefault();
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector('#toggle-popup')
      .addEventListener('click', () => this.togglePopup());
    this.shadowRoot
      .querySelector('#close-popup')
      .addEventListener('click', () => this.togglePopup());
    this.shadowRoot
      .querySelector('#send-whatsapp')
      .addEventListener('submit', (e) => this.sendWhatsapp(e));
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-popup').removeEventListener();
    this.shadowRoot.querySelector('#close-popup').removeEventListener();
    this.shadowRoot.querySelector('#send-whatsapp').removeEventListener();
  }
}

window.customElements.define('click-to-chat', ClickToChat);
