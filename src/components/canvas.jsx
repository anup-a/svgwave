import { h } from 'preact'
import { useRef } from 'preact/hooks'
import SVGCode from './svgCode'

const externalCSS = `
.canvas-heading {
  display: none;
}
@media only screen and (min-width: 640px) {
  .canvas-heading {
   display: block;
  }
}
`
function Canvas({ svg, invert, isDark }) {
  return (
    <div
      className="relative z-10 w-4/5 h-full overflow-hidden bg-white sm:shadow-lg sm:rounded-md sm:m-5 sm:w-7/10 md:w-3/5 sm:h-full dark:bg-darkish-black dark:text-white"
      style="min-height: 400px"
    >
      <style>
        {externalCSS +
          `
      #carbonads {
        position: absolute;
        bottom: ${invert ? 0 : 'unset'};
        top: ${!invert ? 0 : 'unset'};
        right: 0;
      }

      @media screen and (max-width: 1300px) {
        #carbonads {
          bottom: ${invert ? '80px' : 'unset'};
          top: ${!invert ? '80px' : 'unset'};
        }
      }

      #carbonads > span {
        ${
          isDark &&
          `background-color: hsl(0, 0%, 10%);
        box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.085),
          0 0 2px hsl(0deg 0% 0% / 0.085),
          0 0 4px hsl(0deg 0% 0% / 0.085),
          0 0 8px hsl(0deg 0% 0% / 0.085);`
        }
      }

      #carbonads .carbon-text {
        color: ${isDark ? '#ddd' : '#637381'}
      }
      #carbonads .carbon-poweredby {
        background: ${isDark ? '#1e2021' : '#fff'};
        color: ${isDark ? '#fff' : '#c5cdd0'};
      }
      `}
      </style>
      <script
        async
        type="text/javascript"
        src="//cdn.carbonads.com/carbon.js?serve=CEAIP53I&placement=svgwavein"
        id="_carbonads_js"
      ></script>
      {!invert ? (
        <div className="fade-in">
          <h1 className="absolute top-0 hidden w-full p-6 font-sans text-2xl font-extrabold opacity-75 lg:text-4xl canvas-heading">
            Generate SVG Waves 🌊
          </h1>

          <div className="absolute bottom-0 w-full transition-all duration-300 ease-in-out delay-150">
            {svg}
          </div>
        </div>
      ) : (
        <div className="fade-in">
          <div className="absolute top-0 w-full transition-all duration-300 ease-in-out delay-150">
            {svg}
          </div>
          <h1 className="absolute bottom-0 hidden w-full p-6 font-sans text-4xl font-extrabold opacity-75 canvas-heading">
            Generate SVG Waves 🌊
          </h1>
        </div>
      )}
    </div>
  )
}

export default Canvas
