'use client'
import { Episode, Artist, Show, Image as ImageType, Audio } from '@/payload-types'
import { CustomImage } from '../CustomImage'
import { CustomAudio } from '../CustomAudio'

type Props = {
  episode: Episode
}

export default function EpisodeComponent({ episode }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-semibold">{episode.title}</h1>
        <h2>{(episode.curatedBy as Artist[]).map((artist) => artist.name).join(', ')}</h2>
        <h3>{(episode.show as Show).title}</h3>
        <h4>{episode.publishedAt}</h4>
      </div>
      <div>
        <CustomImage image={episode.image as ImageType} alt={episode.title} size={'big'} />
        <CustomAudio audio={episode.audio as Audio} />
      </div>
    </div>
  )
}
