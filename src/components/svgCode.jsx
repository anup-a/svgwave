import { useCallback, useState } from 'preact/hooks'
import { ReactComponent as CopyBtn } from './../assets/001-copy.svg'

import { CREATICA_CLI_URL } from '../helpers/creaticaCli'
import './../styles/highlight.css'

function SVGCode({ code, cliCommand, toggleModal }) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [cliCopied, setCliCopied] = useState(false)

  const handleCopyCli = useCallback(() => {
    navigator.clipboard.writeText(cliCommand)
    setCliCopied(true)
    setTimeout(() => setCliCopied(false), 1000)
  }, [cliCommand])

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
        <div
          className="fixed inset-0 transition-opacity"
          onClick={() => toggleModal()}
        >
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
                {cliCommand ? (
                  <div className="mt-5">
                    <p className="text-sm font-medium text-gray-900">
                      Generate this wave from your terminal
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Script it, batch it, or let your AI agent call it. SVG
                      Wave now ships in the{' '}
                      <a
                        href={CREATICA_CLI_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Creatica CLI
                      </a>
                    </p>
                    <div className="relative mt-2">
                      <pre className="p-3 pr-16 text-xs whitespace-pre-wrap break-words bg-black rounded-lg">
                        <code className="text-white">{cliCommand}</code>
                      </pre>
                      <button
                        type="button"
                        onClick={handleCopyCli}
                        className="absolute px-2 py-1 text-xs text-white bg-gray-700 rounded top-2 right-2 hover:bg-gray-600"
                      >
                        {cliCopied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 mb-2 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex justify-center items-center gap-2 w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
              >
                <CopyBtn className="w-4 h-4" /> <p>Copy</p>
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
