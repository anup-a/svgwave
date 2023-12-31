const template = document.createElement('template')

template.innerHTML = `<style> @media only screen and (max-width: 1000px) { .not-tablet { display: none; } } @media only screen and (max-width: 600px) { .not-mobile { display: none; } }</style><div style="display: flex; justify-content:space-between; align-items:center; background-color: #F3F0FF; border-bottom:2px solid #5a45ff; padding: 6px"> <div> <svg xmlns="http://www.w3.org/2000/svg" width="200" height="39" viewBox="0 0 226 39" fill="none" class="not-mobile not-tablet" > <path d="M37.3883 0.0304146C16.8351 0.0304146 0.173389 16.5687 0.173389 36.9697L37.3883 36.9697L37.3883 0.0304146Z" fill="#5A45FF" fill-opacity="0.6" /> <path d="M37.3882 36.9696C57.9415 36.9696 74.6032 20.4314 74.6032 0.0303987L37.3882 0.0303955L37.3882 36.9696Z" fill="#5A45FF" fill-opacity="0.2" /> <path d="M111.818 36.9697C111.818 16.5687 95.1564 0.0304146 74.6032 0.0304146L74.6031 36.9697L111.818 36.9697Z" fill="#5A45FF" fill-opacity="0.2" /> <path d="M149.034 0.030262C128.48 0.030262 111.819 16.5685 111.819 36.9695L149.034 36.9695L149.034 0.030262Z" fill="#5A45FF" fill-opacity="0.6" /> <path d="M149.034 0.0302429C149.034 21.1791 166.178 38.3237 187.327 38.3237L187.327 0.0302463L149.034 0.0302429Z" fill="#5A45FF" fill-opacity="0.6" /> <path d="M225.621 38.3237C225.621 17.1748 208.476 0.0302429 187.327 0.0302429L187.327 38.3237L225.621 38.3237Z" fill="#5A45FF" fill-opacity="0.2" /> </svg> </div> <div style="display: flex; align-items: center; gap: 8px;"> <div id="logo" style="margin-right: 8px"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="39" viewBox="0 0 49 39" fill="none" > <g clip-path="url(#clip0_301_584)"> <path d="M32.2041 1.51703V19.7164V37.9158L47.0703 19.7164L32.2041 1.51703Z" fill="#00B4D8" /> <path d="M32.2041 1.51703L17.3949 19.7164H32.2041V1.51703Z" fill="black" /> <path d="M1.16174 19.7164L17.3949 37.9158H32.2041L17.3949 19.7164H1.16174Z" fill="#C5BEFF" /> <path d="M17.3949 19.7164L32.2041 37.9158V19.7164H17.3949Z" fill="#FF5263" /> <path d="M17.3949 1.51703L1.16174 19.7164H17.3949L32.2041 1.51703H17.3949Z" fill="#5A45FF" /> <path d="M1.16174 19.7164L17.3949 1.51703H32.2041M1.16174 19.7164L17.3949 37.9158H32.2041M1.16174 19.7164H17.3949M32.2041 1.51703L17.3949 19.7164M32.2041 1.51703V19.7164M32.2041 1.51703L47.0703 19.7164L32.2041 37.9158M32.2041 37.9158L17.3949 19.7164M32.2041 37.9158V19.7164M17.3949 19.7164H32.2041" stroke="black" stroke-width="2" /> </g> <defs> <clipPath id="clip0_301_584"> <rect width="48" height="38" fill="white" transform="translate(0.215576 0.802826)" /> </clipPath> </defs> </svg> </div> <a style="text-decoration: none;color: black; font-size: 16px;" href="https://creatica.app" class="not-mobile" >Introducing <span style="text-decoration: underline;">Creatica</span>: Generate unlimited vector website backgrounds! (Its free)</a ><a href="https://creatica.app" style="border-radius: 6px;text-wrap: nowrap;border: 1px solid white;background: #5A45FF;padding: 8px 16px;text-decoration:none;color: white; margin-left: 8px" >🚀 Go to Editor</a > </div> <div class="not-mobile not-tablet"> <svg xmlns="http://www.w3.org/2000/svg" width="160" height="39" viewBox="0 0 185 37" fill="none" > <path d="M-0.000156403 0.213501C-0.000156403 20.3922 16.48 36.7503 36.8093 36.7503L36.8093 0.213504L-0.000156403 0.213501Z" fill="#5A45FF" fill-opacity="0.6" /> <path d="M73.6188 36.7503C73.6188 16.5716 57.1387 0.21352 36.8093 0.21352L36.8093 36.7503L73.6188 36.7503Z" fill="#5A45FF" fill-opacity="0.2" /> <path d="M110.428 36.7503C110.428 16.5716 93.9482 0.21352 73.6189 0.21352L73.6189 36.7503L110.428 36.7503Z" fill="#5A45FF" fill-opacity="0.6" /> <path d="M147.238 36.7503C147.238 16.5716 130.758 0.21352 110.428 0.21352L110.428 36.7503L147.238 36.7503Z" fill="#5A45FF" fill-opacity="0.6" /> <path d="M147.238 36.7503C167.567 36.7503 184.047 20.3922 184.047 0.213504L147.238 0.213501L147.238 36.7503Z" fill="#5A45FF" fill-opacity="0.2" /> </svg> </div></div>`

class Banner extends HTMLElement {
  static get observedAttributes() {
    return ['isdark']
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const homeBtn = this.shadowRoot.querySelector('.btn-wrapper')
    const iconsDiv = this.shadowRoot.querySelector('.icons')

    const screenWidth = window.innerWidth

    if (screenWidth < 500) {
      homeBtn.classList.toggle('active')
      iconsDiv.classList.toggle('open')
    }
  }
}

window.customElements.define('banner-nav', Banner)

export default Banner
