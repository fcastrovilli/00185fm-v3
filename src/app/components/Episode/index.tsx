'use client'
import { Episode, Artist, Show } from '@/payload-types'
import Image from 'next/image'
import { Image as ImageType } from '@/payload-types'
import { Audio } from '@/payload-types'

type Props = {
  episode: Episode
}

export default function EpisodeComponent({ episode }: Props) {
  function CustomImage() {
    if (episode.image) {
      return (
        <Image
          width={(episode.image as ImageType).sizes?.small?.width!}
          height={(episode.image as ImageType).sizes?.small?.height!}
          src={(episode.image as ImageType).sizes?.small?.url!}
          alt={(episode.image as ImageType).credit || episode.title}
        />
      )
    }
  }
  function CustomAudio() {
    if (episode.audio) {
      return <audio controls src={(episode.audio as Audio).url!}></audio>
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">{episode.title}</h1>
      <h2>{(episode.curatedBy as Artist[]).map((artist) => artist.name).join(', ')}</h2>
      <h3>{(episode.show as Show).title}</h3>
      <h4>{episode.publishedAt}</h4>
      <CustomImage />
      <CustomAudio />
    </div>
  )
}
