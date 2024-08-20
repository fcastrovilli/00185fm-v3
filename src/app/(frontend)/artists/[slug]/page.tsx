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
    <div className="p-4">
      <h1>{artist.name}</h1>
      <div className="mt-4">
        {episodes.map((episode) => (
          <div key={episode.slug}>
            <h2>
              <Link href={`/episodes/${episode.slug}`}>{episode.title}</Link>
            </h2>
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
