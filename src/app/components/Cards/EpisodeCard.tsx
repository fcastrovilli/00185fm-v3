'use client'

import { Episode, Image } from '@/payload-types'
import Link from 'next/link'

type Props = {
  episode: Episode
}

import React from 'react'
import Hover from './Hover'
import { CustomImage } from '../CustomImage'

const EpisodeCard = ({ episode }: Props) => {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      scroll={false}
      className="group relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg"
    >
      <CustomImage
        image={episode.image as Image}
        alt={(episode.image as Image).credit || episode.title}
        size="small"
        className="w-full transition duration-300 ease-in-out"
      />

      <div
        className={`absolute inset-0 h-full w-full rounded-lg opacity-0 backdrop-blur-sm transition duration-300 ease-in-out group-hover:opacity-100`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Hover episode={episode} />
        </div>
      </div>
    </Link>
  )
}

export default EpisodeCard
