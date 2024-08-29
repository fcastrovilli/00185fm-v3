import { payload } from '@/payload'
import { Artist, Episode } from '@/payload-types'
import { queryArtistBySlug, queryEpisodesByArtist } from '@/app/query'
import { notFound } from 'next/navigation'
import ArtistComponent from '@/app/components/Artist'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const artists = await payload.find({
    collection: 'artists',
    draft: false,
    limit: 1000,
  })

  return artists.docs?.map(({ slug }) => slug)
}

export default async function ArtistPage({ params }: Props) {
  const artist: Artist = await queryArtistBySlug({ slug: params.slug })

  if (!artist) {
    notFound()
  }

  const episodes: Episode[] = await queryEpisodesByArtist({ artist: artist.id })

  return <ArtistComponent artist={artist} episodes={episodes} />
}
