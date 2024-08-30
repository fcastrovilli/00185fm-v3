import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateEpisodeParams } from '@/app/(frontend)/episodes/[slug]/page'
import EpisodeComponent from '@/app/components/Episode'
import { EpisodeProvider } from '@/app/components/Episode/server'

export const generateStaticParams = generateEpisodeParams

type Props = {
  params: {
    slug: string
  }
}

export default async function EpisodePage({ params }: Props) {
  const { episode } = await EpisodeProvider({ params })
  return (
    <Modal>
      <EpisodeComponent episode={episode} />
    </Modal>
  )
}
