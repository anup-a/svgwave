import { h } from 'preact'
import { useState } from 'preact/hooks'
import { highlightCode } from '../helpers/highlighter'
import copyBtn from './../assets/001-copy.svg'

import './../styles/highlight.css'

function SVGCode({ code, toggleModal }) {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    displaySuccessModal()
  }

  const displaySuccessModal = () => {
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
      toggleModal()
    }, 1000)
  }

  return (
    <div className="fixed z-20 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="self-center inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Export SVG Code
                </h3>
                {copySuccess && (
                  <div className="absolute right-0 px-3 py-2 mt-4 mr-16 bg-gray-100 rounded-md">
                    Copied
                  </div>
                )}
                <div className="mt-6 overflow-y-auto h-40 rounded-lg">
                  <pre className="p-3 whitespace-pre-line bg-black">
                    <code className="text-white ">{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mb-2">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                <img src={copyBtn} width="20px" alt="" className="mr-2" /> Copy
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                onClick={toggleModal}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Close
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SVGCode

{
  /* <div className="relative h-32 p-6 m-6 overflow-y-auto bg-black rounded-md shadow-2xl">
      <div className="absolute top-0 right-0 p-2 btn-grp">
        <button className="m-1">
          <img src={copyBtn} alt="" width="20px" />
        </button>
        <button className="m-1">
          <img src={closeBtn} alt="" width="20px" />
        </button>
      </div>
      <pre className="whitespace-pre-line bg-black">
        <code className="text-white ">{code}</code>
      </pre>
    </div> */
}
