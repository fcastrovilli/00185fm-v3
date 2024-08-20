import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cache } from 'react'
import { Artist, Episode } from '@/payload-types'
import Link from 'next/link'

type Props = {
  params: {
    slug: string
  }
}

export default async function ArtistPage({ params }: Props) {
  const artist: Artist = await queryArtistBySlug({ slug: params.slug })
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

const queryArtistBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'artists',
    limit: 1,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryEpisodesByArtist = cache(async ({ artist: artistId }: { artist: string }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'episodes',
    limit: 12,
    depth: 1,
    where: {
      curatedBy: {
        equals: artistId,
      },
    },
  })

  return result.docs || []
})
