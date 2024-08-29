import { Show, Artist, Episode } from '@/payload-types'
import Link from 'next/link'

type Props = {
  show: Show
  episodes: Episode[]
}

export default async function ShowComponent({ episodes, show }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{show.title}</h1>
      <h2>{(show.curatedBy as Artist[]).map((artist) => artist.name).join(', ')}</h2>
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
