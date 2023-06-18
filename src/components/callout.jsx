import React from 'react'
import HiImage from './../assets/hi.png'
import { useState } from 'preact/hooks'
import XIcon from './../assets/x-icon.svg'
import ArrowUpIcon from './../assets/arrow-up.svg'
import GlobeIcon from './../assets/globe-icon.svg'
import { ReactComponent as GithubLogo } from './../assets/github.svg'

const Callout = () => {
  const [display, setDisplay] = useState(true)

  return (
    <div className="hidden md:block absolute bottom-4 left-4 z-50 shadow-md rounded-md  bg-white max-w-xs">
      <button
        className="float-right mt-4 mr-4"
        onClick={() => setDisplay((t) => !t)}
      >
        <img src={display ? XIcon : ArrowUpIcon} alt="close" width={20} />
      </button>
      {display ? (
        <div className="p-4">
          <p className="my-4 text-xl">
            Hi, <strong>creator here</strong>
          </p>
          <p className="my-4 text-lg">
            I'm urgently seeking a full-stack opportunity (remote) in
            React/Next.js/Node.js/Python.
          </p>
          <div className="flex mt-8 gap-4 items-center">
            <a
              className=" px-4 py-2 bg-black rounded-md text-white"
              href="mailto:aglawe.anup22@gmail.com"
            >
              Contact me
            </a>
            <a href="https://anup.app">
              <img
                src={GlobeIcon}
                alt="portfolio link"
                className="w-6 h-6"
              ></img>
            </a>
            <a href="https://github.com/anup-a">
              <GithubLogo />
            </a>
          </div>
        </div>
      ) : null}

      <img src={HiImage} className="w-20 mr-8" alt="Hi" />
    </div>
  )
}

export default Callout
