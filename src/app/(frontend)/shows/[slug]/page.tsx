import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cache } from 'react'
import { Show, Artist, Episode } from '@/payload-types'
import Link from 'next/link'

type Props = {
  params: {
    slug: string
  }
}

export default async function ShowPage({ params }: Props) {
  const show: Show = await queryShowBySlug({ slug: params.slug })
  const episodes: Episode[] = await queryEpisodesByShow({ show: show.slug })
  return (
    <div className="p-4">
      <h1>{show.title}</h1>
      <h2>{(show.curatedBy as Artist[])[0].name}</h2>
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

const queryShowBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'shows',
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

const queryEpisodesByShow = cache(async ({ show }: { show: string }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'episodes',
    limit: 12,
    depth: 1,
    where: {
      'show.slug': {
        equals: show,
      },
    },
  })

  return result.docs || []
})
