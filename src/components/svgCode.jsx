import React from 'react'

function SVGCode({ code }) {
  return (
    <div className="h-24 p-6 m-6 overflow-y-auto bg-black rounded-md shadow-2xl">
      <pre className="whitespace-pre-line bg-black">
        <code className="text-white ">{code}</code>
      </pre>
    </div>
  )
}

export default SVGCode
