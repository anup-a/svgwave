import { useState } from 'preact/hooks'
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
    <div className="fixed inset-0 z-20 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="self-center inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-headline"
                >
                  Export SVG Code
                </h3>
                {copySuccess && (
                  <div className="absolute right-0 px-3 py-2 mt-4 mr-16 bg-gray-100 rounded-md">
                    Copied
                  </div>
                )}
                <div className="h-40 mt-6 overflow-y-auto rounded-lg">
                  <pre className="p-3 whitespace-pre-line bg-black">
                    <code className="text-white ">{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 mb-2 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
              >
                <img src={copyBtn} width="20px" alt="" className="mr-2" /> Copy
              </button>
            </span>
            <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                onClick={toggleModal}
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
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
