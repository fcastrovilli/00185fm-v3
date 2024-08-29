import { Show } from '@/payload-types'
import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateShowParams } from '@/app/(frontend)/shows/[slug]/page'
import { queryEpisodesByShow, queryShowBySlug } from '@/app/query'
import ShowComponent from '@/app/components/Show'

export const generateStaticParams = generateShowParams

type Props = {
  params: {
    slug: string
  }
}

export default async function ShowPage({ params }: Props) {
  const show: Show = await queryShowBySlug({ slug: params.slug })
  const episodes = await queryEpisodesByShow({ show: show.slug })
  return (
    <Modal>
      <ShowComponent show={show} episodes={episodes} />
    </Modal>
  )
}
