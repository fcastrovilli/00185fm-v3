'use client'
import { Episode, Artist, Show, Image as ImageType, Audio } from '@/payload-types'
import { CustomImage } from '../CustomImage'
import { CustomAudio } from '../CustomAudio'

type Props = {
  episode: Episode
}

export default function EpisodeComponent({ episode }: Props) {
  return (
    <div className="m-4 grid h-full grid-cols-1 gap-4 overflow-y-scroll md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-semibold">{episode.title}</h1>
        <h2>{(episode.curatedBy as Artist[]).map((artist) => artist.name).join(', ')}</h2>
        <h3>{(episode.show as Show).title}</h3>
        <h4>{episode.publishedAt}</h4>
      </div>
      <div className="aspect-square sm:mx-5">
        <CustomImage
          image={episode.image as ImageType}
          alt={(episode.image as ImageType).credit || episode.title}
          size={'big'}
          className="rounded-lg object-cover"
          priority={true}
          quality={80}
          loading="eager"
        />
        <CustomAudio audio={episode.audio as Audio} />
      </div>
    </div>
  )
}
