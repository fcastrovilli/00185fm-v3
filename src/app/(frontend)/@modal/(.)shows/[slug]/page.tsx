import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateShowParams } from '@/app/(frontend)/shows/[slug]/page'
import ShowComponent from '@/app/components/Show'
import { ShowProvider } from '@/app/components/Show/server'

export const generateStaticParams = generateShowParams

type Props = {
  params: {
    slug: string
  }
}

export default async function ShowPage({ params }: Props) {
  const { show, episodes } = await ShowProvider({ params })
  return (
    <Modal>
      <ShowComponent show={show} init_paginated_episodes={episodes} />
    </Modal>
  )
}
