'use client'

import { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'

export default function Schedule() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`${isOpen ? 'translate-x-0' : 'translate-x-[80%]'} fixed right-0 top-0 flex h-screen max-w-prose items-center justify-center transition-all duration-700 ease-in-out`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`z-30 flex h-full max-h-[450px] cursor-pointer items-center justify-center rounded-bl-xl rounded-tl-xl bg-slate-100/80`}
      >
        <div className="relative -rotate-90 transform">
          <span className="select-none text-2xl">SCHEDULE</span>
        </div>
        <ScrollArea className="w-prose max-h-[380px] pr-14 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, iure, voluptatem quasi
          facilis ab dolor reiciendis aliquid repellendus natus quaerat labore molestias alias
          dolore! Adipisci repellat enim nostrum nobis ab? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Suscipit sed soluta nemo maxime repudiandae facilis ipsa laboriosam quam
          quasi veniam architecto adipisci facere doloribus deserunt possimus ullam vitae, a
          voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit sed soluta
          nemo maxime repudiandae facilis ipsa laboriosam quam quasi veniam architecto adipisci
          facere doloribus deserunt possimus ullam vitae, a voluptatum. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Suscipit sed soluta nemo maxime repudiandae facilis ipsa
          laboriosam quam quasi veniam architecto adipisci facere doloribus deserunt possimus ullam
          vitae, a voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
          sed soluta nemo maxime repudiandae facilis ipsa laboriosam quam quasi veniam architecto
          adipisci facere doloribus deserunt possimus ullam vitae, a voluptatum.
        </ScrollArea>
      </button>
    </div>
  )
}
