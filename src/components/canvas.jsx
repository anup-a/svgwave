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
function Canvas({ svg, invert, isDark, svgOutputRef }) {
  return (
    <div
      className="relative z-10 w-4/5 h-full overflow-hidden bg-white sm:rounded-lg sm:m-5 sm:w-7/10 md:w-1/2 sm:h-full dark:bg-darkish-black dark:text-white"
      style="min-height: 400px"
    >
      <style>
        {externalCSS +
          `
      #carbonads {
        position: absolute;
        right: 0;
        z-index: 1;
      }

      @media screen and (max-width: 648px) {
        #carbonads {
          bottom: ${invert ? '0px' : 'unset'};
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
      <div className={`fade-in flex h-full justify-between flex-col`}>
        <h1 className="w-full p-2 my-4 ml-4 font-sans text-2xl font-bold xl:p-6 md:flex">
          Generate SVG Waves
        </h1>
        <div
          ref={svgOutputRef}
          className={`w-full  transition-all duration-300 ease-in-out delay-150 md:mt-0 ${
            !invert && `mt-32`
          }`}
        >
          {svg}
        </div>
      </div>
    </div>
  )
}

export default Canvas
