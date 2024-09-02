'use client'

import { Artist, Episode } from '@/payload-types'
import EpisodeCard from '../Cards/EpisodeCard'
import { PaginatedDocs } from 'payload'
import { useEffect, useState } from 'react'
import { getPaginatedEpisodesByArtist } from '@/app/actions'
import { useInView } from 'react-intersection-observer'

type Props = {
  artist: Artist
  init_paginated_episodes: PaginatedDocs<Episode>
}

export default function ArtistComponent({ artist, init_paginated_episodes }: Props) {
  const [nextPage, setNextPage] = useState(init_paginated_episodes.nextPage)
  const [hasNextPage, setHasNextPage] = useState(init_paginated_episodes.hasNextPage)
  const [episodes, setEpisodes] = useState(init_paginated_episodes.docs)
  const [scrollTrigger, isInView] = useInView()
  async function fetchNextPage() {
    const result = await getPaginatedEpisodesByArtist({
      pageParam: nextPage as number,
      artistId: artist.id,
    })
    setNextPage(result.nextPage)
    setHasNextPage(result.hasNextPage)
    setEpisodes(episodes.concat(result.docs))
  }

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  })
  return (
    <div>
      <h1 className="text-3xl font-semibold">{artist.name}</h1>
      <div className="flex flex-col gap-4">
        {episodes.map((episode) => (
          <EpisodeCard episode={episode} key={episode.id} />
        ))}
      </div>
      <div className="flex w-full justify-center">
        {(hasNextPage && (
          <div className="text-2xl" ref={scrollTrigger}>
            Loading...
          </div>
        )) || <p className="text-2xl">No more episodes to load</p>}
      </div>
    </div>
  )
}
