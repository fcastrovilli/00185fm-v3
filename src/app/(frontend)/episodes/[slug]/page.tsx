import { payload } from '@/payload'
import EpisodeComponent from '@/app/components/Episode'
import { EpisodeProvider } from '@/app/components/Episode/server'

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
  const { episode } = await EpisodeProvider({ params })

  return <EpisodeComponent episode={episode} />
}
