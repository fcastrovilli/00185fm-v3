import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cache } from 'react'
import { Episode, Artist, Show } from '@/payload-types'

type Props = {
  params: {
    slug: string
  }
}

export default async function EpisodePage({ params }: Props) {
  const episode: Episode = await queryEpisodeBySlug({ slug: params.slug })
  return (
    <div className="p-4">
      <h1>{episode.title}</h1>
      <h2>{(episode.curatedBy as Artist).name}</h2>
      <h3>{(episode.show as Show).title}</h3>
      <h4>{episode.publishedAt}</h4>
    </div>
  )
}

const queryEpisodeBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'episodes',
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
