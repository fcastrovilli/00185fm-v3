import { payload } from '@/payload'
import { Episode, Artist, Show } from '@/payload-types'
import { queryEpisodeBySlug } from '@/app/query'

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
