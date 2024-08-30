import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateArtistParams } from '@/app/(frontend)/artists/[slug]/page'
import ArtistComponent from '@/app/components/Artist'
import { ArtistProvider } from '@/app/components/Artist/server'

export const generateStaticParams = generateArtistParams

type Props = {
  params: {
    slug: string
  }
}

export default async function ArtistPage({ params }: Props) {
  const { artist, episodes } = await ArtistProvider({ params })
  return (
    <Modal>
      <ArtistComponent artist={artist} init_paginated_episodes={episodes} />
    </Modal>
  )
}
