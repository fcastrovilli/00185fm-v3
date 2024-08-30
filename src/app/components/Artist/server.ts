import { getPaginatedEpisodesByArtist } from '@/app/actions'
import { queryArtistBySlug } from '@/app/query'
import { notFound } from 'next/navigation'

export async function ArtistProvider({ params }: { params: { slug: string } }) {
  const artist = await queryArtistBySlug({ slug: params.slug })
  if (!artist) {
    notFound()
  }

  const episodes = await getPaginatedEpisodesByArtist({ artistId: artist.id, pageParam: 1 })

  return { artist, episodes }
}
