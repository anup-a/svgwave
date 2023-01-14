const template = document.createElement('template')

template.innerHTML = `
    <style>
      .dark-theme {
        background-color: #242535;
        color: white;
      }

      .dark-theme.icons a {
        display: none;
        margin:0 auto;
        text-decoration: none;
        color: white;
      }

      .light-theme {
        background-color: #fff;
        color: black;
      }

      .light-theme.icons a {
        display: none;
        margin:0 auto;
        text-decoration: none;
        color: black;
      }

      .float-menu {
        /* width: 100%; */
      }

      .btn-wrapper {
        cursor: pointer;
        /* border: 2px solid black; */
        border-radius: 8px;
        margin: 8px;
        width: 42px;
        z-index: 4;
      }

      .home-icon {
        padding: 10px;
        margin: 0px;
        border-radius: 8px;
      }

      .home-icon,.icons,.btn-wrapper {
          -webkit-transition: -webkit-all 500ms cubic-bezier(.87,-.41,.19,1.44), background-color 0ms;
          transition:  all 500ms cubic-bezier(.87,-.41,.19,1.44), background-color 0ms;
      }

      .btn-wrapper.active {
        -webkit-transform: rotate(45deg);
        transform: rotate(90deg);
        border: none;
        left:0px;
      }

      .icons {
        width:0;
        margin:8px auto;
        /* min-height: 20px; */
        overflow:hidden;
        list-style:none;
        padding:0px;
        /* margin:-40px 0 0 10px;s */
        border-radius: 4px;
        display:flex;
        flex-direction:column;
        align-items:center;
      }

      .icons a p {
        margin: 0 auto;
        text-decoration: none;
        margin-top: 4px;
        font-size: 14px;
        font-family: 'Source Sans Pro', sans-serif;

      }

      .icons.open {
        width:80px;
        padding:10px 0;
        margin:10px 0 0 10px;
        overflow:hidden;
      }

      .icons.open a {
        display: flex;
        flex-direction: column;
        align-items:center;
        height: 100%;
        margin-bottom: 1rem;      
      }

    </style>

    <script>
    </script>

    <div class="float-menu">
      <div class="btn-wrapper">
          <div class="home-icon light-theme">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 275.4 261.94"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:url(#linear-gradient-2);}</style><linearGradient id="linear-gradient" x1="-110.25" y1="121.46" x2="86.6" y2="339.03" gradientTransform="matrix(0.65, 0.65, -0.65, 0.65, 241.32, -12.83)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#da1c5c"/><stop offset="1" stop-color="#662d91"/></linearGradient><linearGradient id="linear-gradient-2" x1="114.87" y1="108.34" x2="165.1" y2="186.6" gradientTransform="matrix(0.99, 0.12, -0.13, 1.01, 32.63, -46.84)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7fffcb"/><stop offset="1" stop-color="#0bf"/></linearGradient></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M172.41,4.15V176A86.21,86.21,0,0,1,0,176V4.15Z"/><path class="cls-2" d="M70.05,175s-4.44-128,83.47-165.62S272,59.55,272,59.55s23.93,66.74-56,64.93S72.22,261.7,72.22,261.7Z"/></g></g></svg>
        </div>
      </div>
      <div class="icons light-theme open">
        <a class="svgwave" href="https://svgwave.in" target="_blank" >
        <svg width="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" data-name="Layer 1" viewBox="0 0 300 196.5"><defs><linearGradient id="linear-gradient" x1="188.08" x2="188.08" y1="139.66" y2="-28.13" gradientTransform="translate(124.18 -104.37) rotate(45)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1d0054"/><stop offset="1" stop-color="#4c5fec"/></linearGradient><linearGradient id="linear-gradient-2" x1="137.86" x2="137.86" y1="179.13" y2="22.83" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00dccc"/><stop offset="1" stop-color="#c7f0b9"/></linearGradient></defs><title>3</title><circle cx="188.08" cy="97.71" r="60.79" transform="translate(-14.01 161.61) rotate(-45)" style="opacity:.8;fill:url(#linear-gradient)"/><path d="M219.78,98q0,3.41-.28,6.73,0,.73-.12,1.47a82.17,82.17,0,0,1-3.52,16.91c-.17.53-.35,1.06-.53,1.59A81.94,81.94,0,0,1,55.94,98c0-.87,0-1.73.05-2.59a81.42,81.42,0,0,1,1.75-14.5A81.51,81.51,0,0,1,74.54,46,81.89,81.89,0,0,1,219.78,98Z" style="opacity:.8;fill:url(#linear-gradient-2)"/></svg>
      <p>svgwave</p>

    </a>
        <a class="tinter" href="https://tinter.uxie.io" target="_blank" >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" width="30" height="30" rx="15" transform="rotate(90 30 0)" fill="url(#paint0_linear_1_22)"/>
            <defs>
            <linearGradient id="paint0_linear_1_22" x1="30" y1="0" x2="88.9797" y2="35.3895" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF3366"/>
            <stop offset="0.164583" stop-color="#FF4455"/>
            <stop offset="1" stop-color="#FF9900"/>
            </linearGradient>
            </defs>
            </svg>
          <p>tinter</p>
        </a>
        <a class="meshy" href="https://meshgradient.in" target="_blank" >
          <svg xmlns="http://www.w3.org/2000/svg"  width="30px" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 144.2 144.2"><g id="Layer_2" data-name="Layer 2"><g id="OBJECTS"><image width="145" height="146" transform="translate(-0.07 -0.84)" xlink:href="data:image/png;base64,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"/></g></g></svg>
          <p>Meshy</p>
        </a>
    </div>
    </div>
`

class FloatMenu extends HTMLElement {
  static get observedAttributes() {
    return ['isdark']
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const homeBtn = this.shadowRoot.querySelector('.btn-wrapper')
    const iconsDiv = this.shadowRoot.querySelector('.icons')

    homeBtn.addEventListener('click', () => {
      homeBtn.classList.toggle('active')
      iconsDiv.classList.toggle('open')
    })

    const screenWidth = window.innerWidth

    if (screenWidth < 500) {
      homeBtn.classList.toggle('active')
      iconsDiv.classList.toggle('open')
    }
  }
  toggleFloatMenuDarkMode(name) {
    if (name === 'isdark') {
      const homeIcon = this.shadowRoot.querySelector('.home-icon')
      const iconsDiv = this.shadowRoot.querySelector('.icons')
      homeIcon.classList.toggle('dark-theme')
      homeIcon.classList.toggle('light-theme')
      iconsDiv.classList.toggle('dark-theme')
      iconsDiv.classList.toggle('light-theme')
    }
  }
  attributeChangedCallback(name) {
    this.toggleFloatMenuDarkMode(name)
  }
}

window.customElements.define('float-menu', FloatMenu)

export default FloatMenu
