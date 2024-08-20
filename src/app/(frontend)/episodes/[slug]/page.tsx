import { payload } from '@/payload'
import { cache } from 'react'
import { Episode, Artist, Show } from '@/payload-types'
import { draftMode } from 'next/headers'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const episodes = await payload.find({
    collection: 'episodes',
    draft: false,
    limit: 1000,
  })

  return episodes.docs?.map(({ slug }) => slug)
}

export default async function EpisodePage({ params }: Props) {
  const episode: Episode = await queryEpisodeBySlug({ slug: params.slug })
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">{episode.title}</h1>
      <h2>{(episode.curatedBy as Artist).name}</h2>
      <h3>{(episode.show as Show).title}</h3>
      <h4>{episode.publishedAt}</h4>
    </div>
  )
}

export const queryEpisodeBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload.find({
    collection: 'episodes',
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
