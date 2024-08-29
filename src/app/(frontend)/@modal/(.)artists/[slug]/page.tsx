import { Artist, Episode } from '@/payload-types'
import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateArtistParams } from '@/app/(frontend)/artists/[slug]/page'
import { queryArtistBySlug, queryEpisodesByArtist } from '@/app/query'
import ArtistComponent from '@/app/components/Artist'

export const generateStaticParams = generateArtistParams

type Props = {
  params: {
    slug: string
  }
}

export default async function ArtistPage({ params }: Props) {
  const artist: Artist = await queryArtistBySlug({ slug: params.slug })
  const episodes: Episode[] = await queryEpisodesByArtist({ artist: artist.id })
  return (
    <Modal>
      <ArtistComponent artist={artist} episodes={episodes} />
    </Modal>
  )
}
