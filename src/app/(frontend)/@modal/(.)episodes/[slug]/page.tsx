import { Episode, Artist, Show } from '@/payload-types'
import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateEpisodeParams } from '@/app/(frontend)/episodes/[slug]/page'
import { queryEpisodeBySlug } from '@/app/query'

export const generateStaticParams = generateEpisodeParams

type Props = {
  params: {
    slug: string
  }
}

export default async function EpisodePage({ params }: Props) {
  const episode: Episode = await queryEpisodeBySlug({ slug: params.slug })
  return (
    <Modal>
      <h1 className="text-3xl font-semibold">{episode.title}</h1>
      <h2>{(episode.curatedBy as Artist).name}</h2>
      <h3>{(episode.show as Show).title}</h3>
      <h4>{episode.publishedAt}</h4>
    </Modal>
  )
}
