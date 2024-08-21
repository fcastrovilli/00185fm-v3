import { payload } from '@/payload'
import { Artist, Episode } from '@/payload-types'
import Link from 'next/link'
import { queryArtistBySlug, queryEpisodesByArtist } from '@/app/query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const artists = await payload.find({
    collection: 'artists',
    draft: false,
    limit: 1000,
  })

  return artists.docs?.map(({ slug }) => slug)
}

export default async function ArtistPage({ params }: Props) {
  const artist: Artist = await queryArtistBySlug({ slug: params.slug })

  if (!artist) {
    notFound()
  }

  const episodes: Episode[] = await queryEpisodesByArtist({ artist: artist.id })

  return (
    <div>
      <h1 className="text-3xl font-semibold">{artist.name}</h1>
      <div className="mt-4">
        {episodes.map((episode) => (
          <div key={episode.id} className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2">
            <Link href={`/episodes/${episode.slug}`}>{episode.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
