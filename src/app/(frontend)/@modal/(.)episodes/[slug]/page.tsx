import { Episode } from '@/payload-types'
import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateEpisodeParams } from '@/app/(frontend)/episodes/[slug]/page'
import { queryEpisodeBySlug } from '@/app/query'
import EpisodeComponent from '@/app/components/Episode'

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
      <EpisodeComponent episode={episode} />
    </Modal>
  )
}
