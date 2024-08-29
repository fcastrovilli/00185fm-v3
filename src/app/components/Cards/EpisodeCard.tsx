'use client'

import { Artist, Episode, Show } from '@/payload-types'
import Link from 'next/link'

type Props = {
  episode: Episode
}

const EpisodeCard = ({ episode }: Props) => {
  return (
    <div className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2">
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
    </div>
  )
}

export default EpisodeCard
