import { payload } from '@/payload'
import { Episode } from '@/payload-types'
import { queryEpisodeBySlug } from '@/app/query'
import { notFound } from 'next/navigation'
import EpisodeComponent from '@/app/components/Episode'

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
    where: {
      public: {
        equals: true,
      },
    },
  })

  return episodes.docs?.map(({ slug }) => slug)
}

export default async function EpisodePage({ params }: Props) {
  const episode: Episode = await queryEpisodeBySlug({ slug: params.slug })
  if (!episode) {
    notFound()
  }

  return <EpisodeComponent episode={episode} />
}
