'use client'

import { Episode } from '@/payload-types'
import Link from 'next/link'

type Props = {
  episode: Episode
}

import React from 'react'
import Hover from './Hover'

const EpisodeCard = ({ episode }: Props) => {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      scroll={false}
      className="group relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${episode.title}/350`}
        alt={episode.title}
        className="w-full transition duration-300 ease-in-out"
      />

      <div
        className={`absolute inset-0 h-full w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Hover episode={episode} />
        </div>
      </div>
    </Link>
  )
}

export default EpisodeCard
