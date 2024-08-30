import { payload } from '@/payload'
import ArtistComponent from '@/app/components/Artist'
import { ArtistProvider } from '@/app/components/Artist/server'

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
  const { artist, episodes } = await ArtistProvider({ params })

  return <ArtistComponent artist={artist} init_paginated_episodes={episodes} />
}
