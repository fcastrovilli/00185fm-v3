'use client'

import { Artist, Episode, Show, Image as ImageType } from '@/payload-types'
import Link from 'next/link'
import { CustomImage } from '../CustomImage'

type Props = {
  episode: Episode
}

const EpisodeCard = ({ episode }: Props) => {
  return (
    <div className="my-2 flex flex-col gap-2 rounded-lg bg-slate-300/70 p-4">
      <Link scroll={false} href={`/episodes/${episode.slug}`}>
        Title: {episode.title}
      </Link>
      <Link scroll={false} href={`/shows/${(episode.show as Show).slug}`}>
        Show: {(episode.show as Show).title}
      </Link>
      {(episode.curatedBy as Artist[]).map((artist, i) => (
        <Link scroll={false} key={`${artist.slug}-${i}`} href={`/artists/${artist.slug}`}>
          Curated By: {artist.name}
        </Link>
      ))}
      <CustomImage image={episode.image as ImageType} alt={episode.title} size="small" />
    </div>
  )
}

export default EpisodeCard
