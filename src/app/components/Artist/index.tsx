import { Artist, Episode } from '@/payload-types'
import Link from 'next/link'

type Props = {
  artist: Artist
  episodes: Episode[]
}

export default async function ArtistComponent({ artist, episodes }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{artist.name}</h1>
      <div className="mt-4">
        {episodes.map((episode) => (
          <div
            key={episode.slug}
            className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2"
          >
            <Link scroll={false} href={`/episodes/${episode.slug}`}>
              {episode.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
